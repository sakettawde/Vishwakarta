import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs , Text, Button, Left, Icon, Right,Fab } from 'native-base';
import {View} from 'react-native';
import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree';

export default class Feed extends Component {
  
  state={
    records:""
  }
  componentDidMount(){
    this.state.records=this.props.navigation.getParam('records')
    
  }
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
        <Tab1/>
      </Tab>
      <Tab heading='MY WALL'>
        <Tab2/>
      </Tab>
      <Tab heading='TEMPLE'>
        <Tab3/>
      </Tab>
    </Tabs>
    <View style={{flex:0}}>
    <Fab
            active={true}
            //direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('Newpost')}>
            <Icon name="md-add"/>
          </Fab>
        </View>
  </Container>
  );
  }
}