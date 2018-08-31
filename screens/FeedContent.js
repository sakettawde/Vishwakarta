import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs , Text, Button } from 'native-base';
import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree';

export default class Feed extends Component {
  
  
  
  render(){
  return(
  <Container style={{paddingTop: 23}}>
    <Header  hastabs>
        <Text>Feed</Text>
    </Header>
    <Tabs>
      <Tab heading='Admin'>
        <Tab1/>
      </Tab>
      <Tab heading='My Feed'>
        <Tab2/>
      </Tab>
      <Tab heading='Temple'>
        <Tab3/>
      </Tab>
    </Tabs>
  </Container>
  );
  }
}