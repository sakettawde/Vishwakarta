import React, { Component } from 'react';
import {createDrawerNavigator} from 'react-navigation';
import FeedContent from './FeedContent';
import Contacts from './Contacts';
import Profile from './profileSettings';


export default class Feed extends Component {

  

  render(){
  return(
    <AppDrawerNavigator/>
  );
  }
}
const AppDrawerNavigator = createDrawerNavigator({
  FeedContent:{
    screen:FeedContent
    
  },
  Contacts:{
  screen: Contacts,

  }

})
