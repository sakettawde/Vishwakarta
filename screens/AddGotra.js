import React from 'react';
import { StyleSheet, Text, StatusBar ,Alert} from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label } from 'native-base';
import { AddGotraUrl } from "../assets/ApiUrl";
import {NextButton,ButtonText ,FlexColumn} from "../utils/styles";
import {LinearGradient} from 'expo';


export default class AddGotra extends React.Component {
  state={
   gotra:""
  }


  addGotraApi = () =>{
    console.log("In AddGotraApi",this.state.gotra)
    fetch(AddGotraUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:this.state.gotra
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("AddGotra Response", data)
        if(data.message=="Gotra Added"){
          this.props.navigation.state.params.updateGotra()  
          this.props.navigation.navigate('SignupScreen')
                  
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
        {/* <Header ><Text style={styles.headline}>Add New Gotra</Text></Header> */}
        
          <Form>
            <Item stackedLabel>
              <Label>Enter your Gotra</Label>
              <Input onChangeText={(text)=>{this.setState({gotra:text})}} />
            </Item>
            
          </Form>

          <NextButton 
          onPress={()=>this.addGotraApi()}
          style={{marginTop: 10,}}  
          >
          <LinearGradient
                colors={["#7c98fd", "#4e43f9"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                style={{ width: "100%", height: "100%",borderRadius:10}}
              >

            <ButtonText>Add</ButtonText>
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
