import React, { Component  } from 'react';
import { StyleSheet, View ,Alert  } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label ,Title , Button ,Text } from 'native-base';
import { Signin } from "../assets/ApiUrl";

export default class LoginScreen extends Component {
  


  state= {
    phno:"",
    pwd:""
  }

 
LoginApi = (phno,pwd) =>{
  console.log("In LoginApi")
  fetch(Signin, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mobile_no: phno,
      password: pwd
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log("Login Response", data)
      
      if(data.message=="Login succesfully"){
        console.log(data.records.user_id)
        this.props.navigation.navigate('Drawer',{
          records:data.records
        })
                
      }
      else if(data.message){
        Alert.alert("Invalid Username or Password")
      }
        
    })

  }

  Login = () =>{
    if(this.state.phno.length<10){
      Alert.alert("Invalid Number")
      return
    }
    console.log('In Login')
    this.LoginApi(this.state.phno,this.state.pwd)

  }
  
  render() {
    return (
      <Container style={{paddingTop: 23}}>
        <Header style={{paddingTop: 20}}> 
        <Title>Login</Title>
        </Header>
        <Content >
          <Form > 
            <Item stackedLabel>
              <Label>Mobile Number</Label>
              <Input onChangeText={text=>{this.setState({phno:text})}}
                  keyboardType = 'numeric' maxLength={10} /> 
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input  secureTextEntry={true} onChangeText={text=>this.setState({pwd:text})}/>
            </Item>
           
          </Form>

          <Button  full onPress={()=>{this.Login()}} style={styles.container}>
            <Text>Login</Text>
          </Button>
              
          <View style={{flex : 1 , flexDirection : 'row' }}>
            <View style={styles.container}>
            <Text style={styles.headline}  onPress={()=>{this.props.navigation.navigate('SignupScreen')}}>
            SignUp</Text>
            </View>
            <View style={styles.container}>
            <Text style={styles.headline} onPress={()=>{this.props.navigation.navigate('PasswordRv')}}>
              Forget Password</Text>
              </View>
          </View>
        </Content>
        
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop : 10,
  },
  headline :{
    textAlign: 'center'
  }
});