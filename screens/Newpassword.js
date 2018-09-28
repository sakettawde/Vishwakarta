import React from 'react';
import { StyleSheet, Text, View,Alert,StatusBar } from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label, CheckBox } from 'native-base';
import { ChangePass } from "../assets/ApiUrl";
import {LoginButton,ButtonText2 ,FlexColumn,ScreenTitle,FlexRow
  ,StyledTextInput,TextField,TextLabel} from "../utils/styles";
  import {LinearGradient} from 'expo';
  import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Newpassword extends React.Component {
  static navigationOptions = {
    title: 'Change Password',
  }
  state={
    mobile_num:"",
    passwd:"",
    confpass:""
  }

  NewPassApi = () =>{
    console.log("In NewPassApi")
    fetch(ChangePass, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        u_number: this.state.mobile_num,
        u_pass: this.state.passwd
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("NewPassApi Response", data)
        if(data.message=="password updated succesfully"){
          this.props.navigation.navigate('Login')
                  
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
    componentDidMount(){
      const num=this.props.navigation.getParam('mobile_num');
      console.log(num)
      this.setState({mobile_num:num})
    }
    check(){
      if(this.state.passwd==this.state.confpass){
        this.NewPassApi();

      }
      else{
        Alert.alert("Passwords doesn't match!!");
      }
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
              <TextLabel>Enter New Password</TextLabel>
              <StyledTextInput
              selectionColor="#3f51b5"
              underlineColorAndroid="transparent"
              secureTextEntry={true} onChangeText={(text)=>{this.setState({passwd:text})}}
              />
            </FlexRow>
            </TextField>

            <TextField style={{alignSelf: 'center',marginTop: 12,}}>
            <FlexRow style={{alignItems:"center",}}>
              <TextLabel>Confirm Password</TextLabel>
              <StyledTextInput
              selectionColor="#3f51b5"
              underlineColorAndroid="transparent"
              secureTextEntry={true} onChangeText={(text)=>{this.setState({confpass:text})}}
              />
            </FlexRow>
            </TextField>
           
          
        <LoginButton 
            onPress={()=>this.check()}
          style={{marginTop: 10,marginBottom:20}}
          >
            <ButtonText2>Change Password</ButtonText2>
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
