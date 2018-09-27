import React from 'react';
import { StyleSheet, Text, View,Alert,StatusBar } from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label, CheckBox } from 'native-base';
import { ChangePass } from "../assets/ApiUrl";
import {NextButton,ButtonText ,FlexColumn,ScreenTitle} from "../utils/styles";
import {LinearGradient} from 'expo';


export default class Newpassword extends React.Component {
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
      <FlexColumn style={{marginTop:StatusBar.currentHeight}}>
        {/* <Header ><Text style={styles.headline}>Password Recovery</Text></Header> */}
        <ScreenTitle>Password Recovery</ScreenTitle>
          <Form>
            <Item stackedLabel>
              <Label>Enter New Password</Label>
              <Input secureTextEntry={true} onChangeText={(text)=>{this.setState({passwd:text})}}/>
            </Item>
            <Item stackedLabel>
              <Label>Confirm Password</Label>
              <Input secureTextEntry={true} onChangeText={(text)=>{this.setState({confpass:text})}}/>
            </Item>
            
          </Form>

           <NextButton 
          onPress={()=>this.check()}
          style={{marginTop: 10,}}  
          >
          <LinearGradient
                colors={["#00aa8a", "#00b392"]}
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
