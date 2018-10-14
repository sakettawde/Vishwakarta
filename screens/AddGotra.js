import React from 'react';
import { StyleSheet, Text, StatusBar ,Alert} from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label } from 'native-base';
import { AddGotraUrl } from "../assets/ApiUrl";
import {LoginButton,ButtonText2 ,FlexColumn,ScreenTitle,FlexRow
  ,StyledTextInput,TextField,TextLabel} from "../utils/styles";
import {LinearGradient} from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class AddGotra extends React.Component {
  static navigationOptions = {
    title: 'Add New Gotra',
  }
  state={
   gotra:""
  }


  addGotraApi = () =>{
    if(this.state.gotra==''){
      return
    }
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
      <LinearGradient
      colors={["#00aa8a", "#00b392"]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 1.0 }}
      style={{ width: "100%", height: "100%"}}
    >
      <FlexColumn style={{marginTop:StatusBar.currentHeight}}>
        {/* <Header ><Text style={styles.headline}>Add New Gotra</Text></Header> */}
        <KeyboardAwareScrollView enableOnAndroid={true} style={{width:'100%'}}>


          <TextField style={{alignSelf: 'center',marginTop: 12,}}>
            <FlexRow style={{alignItems:"center",}}>
              <TextLabel>Enter your Gotra</TextLabel>
              <StyledTextInput
              selectionColor="#3f51b5"
              underlineColorAndroid="transparent"
              onChangeText={(text)=>{this.setState({gotra:text})}}
              />
            </FlexRow>
            </TextField> 

        
         
        <LoginButton 
           onPress={()=>this.addGotraApi()}
          style={{marginTop: 10,marginBottom:20}}
          >
            <ButtonText2>Add</ButtonText2>
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
