import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs , Text, Button, Left, Icon, Right,Fab } from 'native-base';
import {View,StatusBar} from 'react-native';
import Mentor from './Mentor';
import MyRequests from './MyRequests';


export default class MentorStudent extends Component {
  
  
  render(){
  return(
  <Container style={{marginTop:StatusBar.currentHeight}}>
    {/* <Header hastabs>
      
    <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
            <Right />
     
    </Header>    */}
    <Tabs >
      <Tab heading='MENTORS'>
        <Mentor {...this.props}/>
      </Tab>
      <Tab heading='MY TRAINING'>
        <MyRequests  {...this.props}/>
      </Tab>
      <Tab heading='MY REQUESTS'>
        {/* <Tab3  {...this.props}/> */}
      </Tab>
    </Tabs>
    
  </Container>
  );
  }
}