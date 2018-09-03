import React from 'react';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Dimensions,Button} from 'react-native';
import {createStackNavigator,createDrawerNavigator,DrawerItems} from 'react-navigation';
//  import {Root } from 'native-base';
//import {createDrawerNavigator,DrawerItems} from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SignupScreen2 from './screens/SignupScreen2';
import PasswordRv from './screens/PasswordRv';
import OtpScreen from './screens/OtpScreen';
import UserProfile from './screens/UserProfile';
import FeedContent from './screens/FeedContent';
import Contacts from './screens/Contacts';
import Newpassword from './screens/Newpassword';
import MyProfile from './screens/MyProfile';
import Newpost from './screens/Newpost';


import { Font, AppLoading } from "expo";



export default class App extends React.Component {

    constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }




  render() { if (this.state.loading) {
      return (
                  <AppLoading />
        
      );
    }
    return (
      
        <AppStackNavigator />
      
    );
  }
}


const AppDrawerNavigator = createDrawerNavigator({
  FeedContent:{
    screen:FeedContent,
    navigationOptions: { header: null },
    //display: 'none',
  },
  Profile : {
    screen : MyProfile ,
    navigationOptions: { header: null }
  },
  Contacts:{
  screen: Contacts,
  navigationOptions: { header: null }
  },
 

  Logout:{
    screen: LoginScreen,
  navigationOptions: { header: null }
  }

}
)


const AppStackNavigator = createStackNavigator({

    Login :{ 
    screen : LoginScreen ,
    navigationOptions: { header: null }
   },
    SignupScreen : {
     screen : SignupScreen ,
     navigationOptions: { header: null }
   },
   SignupScreen2 : {
    screen : SignupScreen2 ,
    navigationOptions: { header: null }
  },
   PasswordRv : {
     screen : PasswordRv ,
     navigationOptions: { header: null }
   },
   UserProfile : {
     screen : UserProfile ,
     navigationOptions: { header: null }
   },
   Drawer : {
     screen : AppDrawerNavigator,
     navigationOptions: { 
       header: null
     }
    },
    OtpScreen:{
      screen : OtpScreen,
     navigationOptions: { header: null }
    },
    Newpassword:{
      screen : Newpassword,
     navigationOptions: { header: null }
    },
    Newpost:{
      screen : Newpost,
     navigationOptions: { header: null }
    }

})


