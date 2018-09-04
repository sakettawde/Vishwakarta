import React, { Component  } from 'react';
import { StyleSheet, View ,Alert  } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label ,Title , Button ,Text } from 'native-base';
import { Signin } from "../assets/ApiUrl";

export default class LoginScreen extends Component {
  


  state= {
    phno:"",
    pwd:""
  }

  handle_mobileNum(text){
    this.setState({phno:text})
    console.log("mob num",this.state.phno  )
  }

  handlePwd(text){
    this.setState({pwd:text})
    console.log("pass",this.state.pwd  )
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
      if(data.status_code==0){
        console.log("SignIn Failed!")
        Alert.alert("Invalid Mobile Number or Password")
        
      }
      else if(data.status_code==200){
        this.navigation.navigate('Drawer')
      }
        
    })

  }

  Login = () =>{
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
              <Input onChangeText={text=>{this.handle_mobileNum(text)}}/> 
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input  secureTextEntry={true} onChangeText={text=>this.handlePwd(text)}/>
            </Item>
           
          </Form>

          <Button  full onPress={()=>this.Login()} style={styles.container}>
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