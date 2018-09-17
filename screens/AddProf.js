import React from 'react';
import { StyleSheet,  StatusBar ,Alert} from 'react-native';
import { Header, Form,Item ,Input, Label } from 'native-base';
import { AddProfUrl } from "../assets/ApiUrl";
import {NextButton,ButtonText ,FlexColumn} from "../utils/styles";
import {LinearGradient} from 'expo';


export default class AddProf extends React.Component {
  state={
   prof:""
  }


  addProfApi = () =>{
    console.log("In AddProfApi",this.state.prof)
    fetch(AddProfUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:this.state.prof
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("AddGotra Response", data)
        if(data.message=="Profession Added"){
          this.props.navigation.state.params.updateProf()  
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
      <FlexColumn style={{marginTop:StatusBar.currentHeight }}>
        {/* <Header ><Text style={styles.headline}>Add New Profession</Text></Header> */}
        
          <Form>
            <Item stackedLabel>
              <Label>Enter your Profession</Label>
              <Input onChangeText={(text)=>{this.setState({prof:text})}} />
            </Item>
            
          </Form>

           <NextButton 
          onPress={()=>this.addProfApi()}
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
