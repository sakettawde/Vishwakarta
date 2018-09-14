import React from 'react';
import { BackHandler} from 'react-native';
import {createStackNavigator,createDrawerNavigator,DrawerItems} from 'react-navigation';
//  import {Root } from 'native-base';
//import {createDrawerNavigator,DrawerItems} from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import SignupScreen2 from './screens/SignupScreen2';
import PasswordRv from './screens/PasswordRv';
import OtpScreen from './screens/OtpScreen';
import UserProfile from './screens/UserProfile';
import Wall from './screens/FeedContent';
import Contacts from './screens/Contacts';
import Newpassword from './screens/Newpassword';
import MyProfile from './screens/MyProfile';
import Newpost from './screens/Newpost';
import Sidebar from './screens/Sidebar';
// import ContactUsersList from './screens/ContactUsersList';
import Comments from './screens/Comments';
import ChatPage from './screens/ChatPage';


import { Font, AppLoading } from "expo";
import AddGotra from './screens/AddGotra';
import AddProf from './screens/AddProf';



export default class App extends React.Component {

    constructor(props) {
    super(props);
    this.state = { loading: true };
    //this.onBackPress = this.onBackPress.bind(this)
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
    
  }


  // componentDidMount () {
  //   BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  // }

  // componentWillUnmount () {
  //   BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  // }

  // onBackPress () {
  //   const { dispatch, navigation } = this.props
  //   dispatch(NavigationActions.back())
  //   //return navigation !== this.props.navigation
  // }

  render() { 
    if (this.state.loading) {
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
  Wall:{
    screen:Wall,
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

},
{
  contentComponent: props => <Sidebar {...props} />
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
    //navigationOptions: { header: null }
  },  
   PasswordRv : {
     screen : PasswordRv ,
     navigationOptions: { header: null }
   },
   UserProfile : {
     screen : UserProfile ,
     //navigationOptions: { header: null }
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
     //navigationOptions: { header: null }
    },
    AddGotra:{
      screen : AddGotra,
     //navigationOptions: { header: null }
    },
    AddProf:{
      screen : AddProf,
     //navigationOptions: { header: null }
    },
    ChatPage:{
      screen : ChatPage
    },
    Comments:{
      screen:Comments
    },

},{
  initialRouteName:'Login',
  
})


