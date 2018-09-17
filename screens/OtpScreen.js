import React from 'react';
import { StyleSheet, Text, View ,Alert,StatusBar} from 'react-native';
import { Header, Form, Item ,Input, Label } from 'native-base';
import { UpdateOtp,CheckOtp } from "../assets/ApiUrl";
import {NextButton,ButtonText ,FlexColumn} from "../utils/styles";
import {LinearGradient} from 'expo';


export default class OtpScreen extends React.Component {
  state={
    mobile_num:"",
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

    // let authkey = "133779ATT6JFXy0k5850e783"
    // let sender = "SHMGMT"
    // let route = "4"
    //let number = this.state.mobile_no
    let Inquirymsg = "Hey there, here is ur otp :" + random

    // let url =
    //   "http://bhashsms.com/api/sendmsg.php?" +
    //   "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
    //   message +
    //   "&sender=MHOURZ&phone=" +
    //   number +
    //   "&priority=ndnd&stype=normal"
    //console.log("url", url)
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
          this.props.navigation.navigate('Newpassword',{
            mobile_num:this.state.mobile_num
          })
                  
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
      <FlexColumn style={{marginTop:StatusBar.currentHeight}}>
        <Header ><Text style={styles.headline}>Password Recovery</Text></Header>
        
          <Form>
            <Item stackedLabel>
              <Label>Enter OTP</Label>
              <Input onChangeText={(text)=>{this.setState({otp:text})}}
                  keyboardType = 'numeric' maxLength={4}
              />
            </Item>
            
            
          </Form>

          <NextButton 
          onPress={()=>this.VerifyOtp()}
          style={{marginTop: 10,}}  
          >
          <LinearGradient
                colors={["#7c98fd", "#4e43f9"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                style={{ width: "100%", height: "100%",borderRadius:10}}
              >

            <ButtonText>Verify</ButtonText>
          </LinearGradient>
        </NextButton>
        
      </FlexColumn>

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
