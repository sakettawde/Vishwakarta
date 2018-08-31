import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image
} from 'react-native';
import {Text , Label , Left ,Right ,Container, Header, Content, List, ListItem,Title } from 'native-base';


export default class ProfileSettings extends React.Component {
  

  render() {
    return (
      <Container style={{paddingTop: 23}}>
        <Header style={{paddingtop:23}}><Text>James Bond</Text></Header>
        <Content>
          <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
          <Text>Info::</Text>
          <List>
            <ListItem>
            <Left style={{flex:1}}>
              <Text>Name</Text>
            </Left>
            <Right style={{flex:2}}>
              <Text>James Bond</Text>
            </Right>
            </ListItem>
            <ListItem>
            <Left style={{flex:1}}>
              <Text>Contact</Text>
            </Left>
            <Right style={{flex:2}}>
              <Text>9879879879</Text>
            </Right>
            </ListItem>
            <ListItem>
            <Left style={{flex:1}}>
              <Text>Email</Text>
            </Left>
            <Right style={{flex:2}}>
              <Text>naamtosunahihoga@yolo.com</Text>
            </Right>
            </ListItem>
            
           
          </List>
        </Content>
      </Container>
    )
  }
}
