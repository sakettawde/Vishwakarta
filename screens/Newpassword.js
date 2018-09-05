import React from 'react';
import { StyleSheet, Text, View,Alert } from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label, CheckBox } from 'native-base';
import { ChangePass } from "../assets/ApiUrl";


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
        u_pass:this.state.passwd
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
    check(){
      if(this.state.passwd==this.state.confpass){
        this.state.mobile_num = this.props.navigation.getParam('mobile_num');
        this.NewPassApi();

      }
      else{
        Alert.alert("Passwords doesn't match!!");
      }
    }

  render() {
    return (
      <Container>
        <Header ><Text style={styles.headline}>Password Recovery</Text></Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Enter New Password</Label>
              <Input secureTextEntry={true} onChangeText={(text)=>{this.setState({passwd:text})}}/>
            </Item>
            <Item stackedLabel>
              <Label>Confirm Password</Label>
              <Input secureTextEntry={true} onChangeText={(text)=>{this.setState({confpass:text})}}/>
            </Item>
            
            <Button rounded full
                onPress={() => {  
                this.check();
              }}>
          <Text style={{ color: 'white' }}>Next</Text>
        </Button>
          </Form>
        </Content>
      </Container>

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
