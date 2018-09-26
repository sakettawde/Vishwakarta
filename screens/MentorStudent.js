import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs , Text, Button, Left, Icon, Right,Fab } from 'native-base';
import {View,StatusBar} from 'react-native';
import Mentor from './Mentor';
import MyRequests from './MyRequests';
import MentorTraining from './MentorTraining';


export default class MentorStudent extends Component {
  
  
  render(){
  return(
  <Container style={{marginTop:StatusBar.currentHeight}}>
    
    <Tabs >
      <Tab heading='MENTORS'>
        <Mentor {...this.props}/>
      </Tab>
      <Tab heading='MY TRAINING'>
      <MentorTraining  {...this.props}/>
      </Tab>
      <Tab heading='MY REQUESTS'>
        <MyRequests  {...this.props}/>
      </Tab>
    </Tabs>
    
  </Container>
  );
  }
}