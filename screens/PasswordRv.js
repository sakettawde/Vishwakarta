import React from 'react';
import { StyleSheet, Text, View ,Alert,StatusBar} from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label } from 'native-base';
import { Passrv } from "../assets/ApiUrl";
import {NextButton,ButtonText ,FlexColumn,ScreenTitle} from "../utils/styles";
import {LinearGradient} from 'expo';


export default class PasswordRv extends React.Component {

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
      <FlexColumn style={{marginTop: StatusBar.currentHeight}}>
        <Header ><Text style={styles.headline}>Password Recovery</Text></Header>
        
          <Form>
            <Item stackedLabel>
              <Label>Mobile Number</Label>
              <Input onChangeText={(text)=>{this.setState({mob_num:text})}} 
                    keyboardType = 'numeric' maxLength={10}/>
            </Item>
            
           
          </Form>

          <NextButton 
          onPress={() => this.PassrvApi()}
          style={{marginTop: 10}}  
          >
          <LinearGradient
                colors={["#7c98fd", "#4e43f9"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                style={{ width: "100%", height: "100%",borderRadius:10}}
              >

            <ButtonText>Next</ButtonText>
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
