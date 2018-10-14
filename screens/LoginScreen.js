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
    phno: "8484902449",
    pwd: "qwerty",
    loading: false,
    load_page:false
  }

  componentDidMount=async()=>{
    const value = await AsyncStorage.getItem('user_id');
    if(value){
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
      });

      this.props.navigation.dispatch(resetAction);
      }
      else{
        this.setState({load_page:true})
      }
    
  }

  _storeData = async (record) => {
    try {
     
      
      await AsyncStorage.multiSet([
        ["user_id", JSON.stringify(record.user_id)],
        ["user_name", record.name],["prof", record.professional],
        ["cvillage", record.cvillage],["avatar", record.avatar],
        ["cpincode",record.current_pincode],
        ["role",record.role],["mentor",record.mentor],["mobile_no",record.mobile_no]
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
          this._storeData(data.records)
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
    if(this.state.load_page){
    return (
      <LinearGradient
                colors={["#00aa8a", "#00b392"]}
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
    )}
    else{
      return( <LinearGradient
        colors={["#00AA8A", "#00AA8B"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
        style={{ width: "100%", height: "100%",marginTop: StatusBar.currentHeight}}
      />)
    }
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
  color: #00AA8A;
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
  background-color: #00e6bb;
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
