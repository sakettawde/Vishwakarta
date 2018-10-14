import React from 'react';
import { StyleSheet, Text, View ,Alert,StatusBar} from 'react-native';
// import { Header, Form, Item ,Input, Label } from 'native-base';
import { UpdateOtp,CheckOtp } from "../assets/ApiUrl";
import {LoginButton,ButtonText2 ,FlexColumn,ScreenTitle,FlexRow
  ,StyledTextInput,TextField,TextLabel} from "../utils/styles";
  import {LinearGradient} from 'expo';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class OtpScreen extends React.Component {
  static navigationOptions = {
    title: 'Verify Otp',
  }
  state={
    mobile_num:"",
    check_field:"",
    otp:""
  }

  reset = () => {
    //this.close()
    //this.setState({ size1, open1: true })

    let random
    let max = 1000
    let min = 9000
    random = Math.floor(Math.random() * (max - min + 1)) + min
    console.log(random)

   
    let Inquirymsg = "Hey there, here is ur otp :" + random


    let authkey = "226898AmIKM4WBH5b502d68"
    let sender = "MSGIND"
    let route = "4"
    let number = this.state.mobile_num
    let urlInquiry='http://control.msg91.com/api/sendhttp.php?authkey='+authkey+'&mobiles='+number+'&message='+Inquirymsg+'&sender='+sender+'&route='+route+'&country=91';


    fetch(urlInquiry, { mode: "no-cors" }).then(response => {
      //console.log(response)
      fetch(UpdateOtp, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          u_number: this.state.mobile_num,
          otp: random
        })
      }).then(data => {
        return data.json()
      })
      .then(data => {
        console.log("OtpUpdate Response", data)          
      })
    })
  }

  componentDidMount(){
    this.state.mobile_num = this.props.navigation.getParam('mobile_num');
    this.state.check_field=this.props.navigation.getParam('Signupfield','no');

    this.reset()
    console.log(this.state.mobile_num)
  }


  VerifyOtp = () =>{
    console.log("In VerifyOtp")
    fetch(CheckOtp, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        u_number: this.state.mobile_num,
        otp:this.state.otp
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("Checkotp Response", data)
        if(data.message=="verify OTP"){
          if(this.state.check_field=='yes'){
            console.log('signing up')
            this.props.navigation.state.params.Signup()
          }
          else{
            this.props.navigation.navigate('Newpassword',{
              mobile_num:this.state.mobile_num
            })
          }
         
                  
        }
        else {
          Alert.alert(data.message)
        }
          
      })
      .catch((error)=>{
        console.log("Api call error");
        console.log(error.message);
     });
  
    }


   

  render() {
    

    return (
      <LinearGradient
      colors={["#00aa8a", "#00b392"]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      style={{ width: "100%", height: "100%"}}
    >
      <FlexColumn style={{marginTop:StatusBar.currentHeight}}>

      <KeyboardAwareScrollView enableOnAndroid={true} style={{width:'100%'}}>
       
          <TextField style={{alignSelf: 'center',marginTop: 12,}}>
            <FlexRow style={{alignItems:"center",}}>
              <TextLabel>Enter Otp</TextLabel>
              <StyledTextInput
              selectionColor="#3f51b5"
              underlineColorAndroid="transparent"
              onChangeText={(text)=>{this.setState({otp:text})}}
              keyboardType = 'numeric' maxLength={4}
              />
            </FlexRow>
            </TextField>
            
         
         <LoginButton 
            onPress={()=>this.VerifyOtp()}
          style={{marginTop: 10,marginBottom:20}}
          >
            <ButtonText2>Verify</ButtonText2>
        </LoginButton>
        </KeyboardAwareScrollView>
      </FlexColumn>
      </LinearGradient>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline:{
    fontSize: 25,
    color: 'white'
  }
});
