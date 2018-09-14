import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs , Text, Button, Left, Icon, Right,Fab } from 'native-base';
import {View} from 'react-native';
import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree';

export default class Feed extends Component {
  
  
  render(){
  return(
  <Container style={{paddingTop: 23}}>
    <Header hastabs>
      
    <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
            <Right />
     
    </Header>   
    <Tabs locked={true}>
      <Tab heading='ADMIN'>
        <Tab1 {...this.props}/>
      </Tab>
      <Tab heading='MY WALL'>
        <Tab2  {...this.props}/>
      </Tab>
      <Tab heading='TEMPLE'>
        <Tab3  {...this.props}/>
      </Tab>
    </Tabs>
    
  </Container>
  );
  }
}