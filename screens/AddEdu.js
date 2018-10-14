import React from 'react';
import { StyleSheet,  StatusBar ,Alert} from 'react-native';
// import { Header, Form,Item ,Input, Label } from 'native-base';
import { AddEduUrl } from "../assets/ApiUrl";
import {LoginButton,ButtonText2 ,FlexColumn,ScreenTitle,FlexRow
  ,StyledTextInput,TextField,TextLabel} from "../utils/styles";
import {LinearGradient} from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';




export default class Addedu extends React.Component {
  static navigationOptions = {
    title: 'Add Your Education',
  }
  state={
   edu:""
  }


  addeduApi = () =>{
    if(this.state.edu==''){
      return
    }
    console.log("In AddeduApi",this.state.edu)
    fetch(AddEduUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:this.state.edu
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("AddGotra Response", data)
        if(data.message=="Education Added"){
          this.props.navigation.state.params.updateEdu()  
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
      <FlexColumn style={{marginTop:StatusBar.currentHeight }}>

          <KeyboardAwareScrollView enableOnAndroid={true} style={{width:'100%'}}>


            <TextField style={{alignSelf: 'center',marginTop: 12,}}>
              <FlexRow style={{alignItems:"center",}}>
                <TextLabel>Enter your Education</TextLabel>
                <StyledTextInput
                selectionColor="#3f51b5"
                underlineColorAndroid="transparent"
                onChangeText={(text)=>{this.setState({edu:text})}}
                />
              </FlexRow>
              </TextField> 



            <LoginButton 
             onPress={()=>this.addeduApi()}
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
