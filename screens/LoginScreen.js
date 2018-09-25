import React, { Component } from "react"
import {
  View,
  Alert,
  AsyncStorage,
  TextInput,
  StatusBar,
  Button,
  TouchableOpacity,
  ActivityIndicator
} from "react-native"
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Title,
  Text
} from "native-base"

import { LinearGradient } from "expo"
import { Signin } from "../assets/ApiUrl"
import styled from "styled-components"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackActions, NavigationActions } from 'react-navigation';



export default class LoginScreen extends Component {
  state = {
    phno: "",
    pwd: "",
    loading: false
  }

  _storeData = async (user_id, user_name,avatar,cvillage,prof,cpincode) => {
    try {
     
      // await AsyncStorage.setItem("user_id", JSON.stringify(user_id))
      // await AsyncStorage.setItem("user_name", user_name)
      // await AsyncStorage.setItem("avatar", avatar)
      // await AsyncStorage.setItem("cvillage", cvillage)
      // await AsyncStorage.setItem("prof", prof)
      await AsyncStorage.multiSet([
        ["user_id", JSON.stringify(user_id)],
        ["user_name", user_name],["prof", prof],
        ["cvillage", cvillage],["avatar", avatar],
        ["cpincode",cpincode]
      ])
      this.setState({loading:false})
     // this.props.navigation.navigate("Drawer")
     const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
    });
    this.props.navigation.dispatch(resetAction);

    } catch (error) {
      // Error saving data
    }
  }

  LoginApi = (phno, pwd) => {
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

        if (data.message == "Login succesfully") {
          console.log(data.records)
          this.setState({ records: data.records })
          // this.setState({user_id:data.records.user_id})
          // this.setState({user_name:data.records.name})
          this._storeData(data.records.user_id, data.records.name,data.records.avatar,
            data.records.cvillage,data.records.professional,data.records.current_pincode)
        } else if (data.message) {
          Alert.alert("Invalid Username or Password")
        }
      })
  }

  Login = () => {
    if (this.state.phno.length < 10) {
      Alert.alert("Invalid Number")
      return
    }
    console.log("In Login")
    this.setState({loading:true})
    this.LoginApi(this.state.phno, this.state.pwd)
  }

  render() {
    return (
      <LinearGradient
                colors={["#7c98fd", "#4e43f9"]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 0.0, y: 1.0 }}
                style={{ width: "100%", height: "100%",marginTop: StatusBar.currentHeight}}
              >
              <FlexColumn style={{flex:1}}>

              
      <Spacer/>
        <FlexColumn style={{ alignItems: "center" }}>
          <Logo source={require("../assets/logo-small.png")} />
          <LoginTitle style={{marginBottom:48}}>Login</LoginTitle>

          <KeyboardAwareScrollView enableOnAndroid={true} style={{width:'100%'}} enableAutomaticScroll={false}>
          <TextField style={{alignSelf: 'center'}}>
            <FlexRow style={{alignItems:"center",}}>
              <TextLabel>Mobile</TextLabel>
              <StyledTextInput
              selectionColor="#fff"
              underlineColorAndroid="transparent"
                onChangeText={text => {
                  this.setState({ phno: text })
                }}
                keyboardType="numeric"
                maxLength={10}
              />
            </FlexRow>
          </TextField>
          </KeyboardAwareScrollView>

          <KeyboardAwareScrollView enableOnAndroid={true} style={{width:'100%'}}>

          <TextField style={{marginTop:12,alignSelf: 'center',}}>
            <FlexRow style={{alignItems:"center"}}>
              <TextLabel>Password</TextLabel>
              <StyledTextInput
              selectionColor="#fff"
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={text => this.setState({ pwd: text })}
              />
            </FlexRow>
           </TextField>
           </KeyboardAwareScrollView>
        </FlexColumn>

        <Spacer/>

        <FlexColumn style={{alignItems:"center"}}>
          
        {this.state.loading && <ActivityIndicator size="large" />}

          <LoginButton
            full
            onPress={() => {
              this.Login()
            }}
            style={{marginBottom:8}}
            >
            <ButtonText>Login</ButtonText>
            </LoginButton>

            <TouchableOpacity style={{padding:12}} onPress={() => {
                  this.props.navigation.navigate("SignupScreen")
                }}>
              <TextButton>Don’t have account ? Sign up now</TextButton>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:12}} onPress={() => {
                  this.props.navigation.navigate("PasswordRv")
                }}>
              <TextButton>Forgot Password</TextButton>
            </TouchableOpacity>
            
          

          
          
        </FlexColumn>
        <Spacer/>
        </FlexColumn>
        </LinearGradient>
    )
  }
}

const TextButton = styled.Text`
font-size: 18px;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  color: #ffffff;`

const ButtonText = styled.Text`
font-size: 18px;
  font-weight: 300;
  text-align: center;
  color: #4e43f9;
`

const LoginButton = styled.TouchableOpacity`
border-radius: 5px;
height: 50px;
width:80%;
  background-color: #ffffff;
  justify-content:center;
  align-items:center;
  elevation:3;`

const StyledTextInput = styled.TextInput`
font-size: 18px;
color:#fff;
flex:1;`

const TextLabel = styled.Text`
  font-size: 18px;
  font-weight: 300;
  font-style: normal;
  text-align: left;
  color: #ffffff;
  margin-right:20px;
`

const TextField = styled.View`
  border-radius: 5px;
  width:80%;
  background-color: rgba(124, 152, 253, 0.87);
  padding: 20px;
`

const LoginTitle = styled.Text`
  font-size: 28px;
  font-weight: 900;
  font-style: normal;
  text-align: center;
  color: #ffffff;
`

const FlexColumn = styled.View`
  display: flex;
  flex-direction: column;
`

const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
`

const Spacer = styled.View`
  flex: 1;
`

const Logo = styled.Image``

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 10
//   },
//   headline: {
//     textAlign: "center"
//   }
// })
