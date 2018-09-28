import React from 'react';
import { StyleSheet, Text, View ,Alert,StatusBar} from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label } from 'native-base';
import { Passrv } from "../assets/ApiUrl";
import {LoginButton,ButtonText2 ,FlexColumn,ScreenTitle,FlexRow
  ,StyledTextInput,TextField,TextLabel} from "../utils/styles";
import {LinearGradient} from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



export default class PasswordRv extends React.Component {
  static navigationOptions = {
    title: 'Password Recovery',
  }

  constructor(props) {
    super(props);
    this.state = { mob_num:"" };
   
  }

  

  PassrvApi = () =>{
    if(this.state.mob_num.length<10){
      Alert.alert("Please Enter Valid Number")
      return
    }
    console.log("In PassrvApi")
    fetch(Passrv, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        u_number: this.state.mob_num
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("Passrv Response", data)
        if(data.message=="Correct number"){
          this.props.navigation.navigate('OtpScreen',{
            mobile_num:this.state.mob_num
          })
                  
        }
        else {
          Alert.alert(data)
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
      <FlexColumn style={{marginTop: StatusBar.currentHeight,justifyContent:"center"
                  ,alignItems: 'center',flex:1}}>

        
        
        
        
        {/* <ScreenTitle>Password Recovery</ScreenTitle> */}
        <KeyboardAwareScrollView enableOnAndroid={true} style={{width:'100%'}}>


          <TextField style={{alignSelf: 'center',marginTop: 12,}}>
            <FlexRow style={{alignItems:"center",}}>
              <TextLabel>Mobile Number</TextLabel>
              <StyledTextInput
              selectionColor="#3f51b5"
              underlineColorAndroid="transparent"
              onChangeText={(text)=>{this.setState({mob_num:text})}} 
                    keyboardType = 'numeric' maxLength={10}
              />
            </FlexRow>
            </TextField> 

        
         
        <LoginButton 
           onPress={() => this.PassrvApi()}
          style={{marginTop: 10,marginBottom:20}}
          >
            <ButtonText2>Next</ButtonText2>
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
