import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs , Text, Button, Left, Icon, Right,Fab,
          StyleProvider} from 'native-base';
import {View,StatusBar} from 'react-native';
import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree';
import Tab4 from './VideoTab';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';

export default class Feed extends Component {
  
  
  render(){
  return(
    <StyleProvider style={getTheme(material)}>
  <Container style={{marginTop:StatusBar.currentHeight}}>
    <Header hastabs>
      
    <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name='menu' />
            </Button>
            <Right />
     
    </Header>   
    <Tabs  locked={true}>
      <Tab heading='ADMIN'>
        <Tab1 {...this.props}/>
      </Tab>
      <Tab heading='MY WALL'>
        <Tab2  {...this.props}/>
      </Tab>
      <Tab heading='TEMPLE'>
        <Tab3  {...this.props}/>
      </Tab>
      <Tab heading='VIDEOS'>
        <Tab4  {...this.props}/>
      </Tab>
    </Tabs>
    
  </Container>
  </StyleProvider>
  );
  }
}