import React from 'react';
import { StyleSheet, Text, View ,SafeAreaView,ScrollView,Dimensions} from 'react-native';
import {createStackNavigator} from 'react-navigation';
//  import {Root } from 'native-base';
//import {createDrawerNavigator,DrawerItems} from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import Feed from './screens/Feed';
import SignupScreen from './screens/SignupScreen';
import PasswordRv from './screens/PasswordRv';
import ProfileSettings from './screens/profileSettings';

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

const AppStackNavigator = createStackNavigator({

    Login :{ 
    screen : LoginScreen ,
    navigationOptions: { header: null }
   },
    Feed : {
     screen : Feed,
     navigationOptions: { header: null }
   },
    SignupScreen : {
     screen : SignupScreen ,
     navigationOptions: { header: null }
   },
   PasswordRv : {
     screen : PasswordRv ,
     navigationOptions: { header: null }
   },
   ProfileSettings : {
     screen : ProfileSettings ,
     navigationOptions: { header: null }
   },
})


