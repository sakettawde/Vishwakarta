import React from 'react';
import { StyleSheet,  View } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label , Button ,DatePicker, Text  } from 'native-base';

export default class SignUp extends React.Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Mobile Number</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>BirhtDate</Label>
              <Input />
            </Item>
            
            <Item stackedLabel last>
              <Label>Mobile Number</Label>
              <Input />
            </Item>
            
            
          </Form>
          <Button
          rounded
          full
          onPress={() => {
            this.props.navigation.navigate('Feed');
          }}>
            <Text style={{ color: 'red' }}>Next</Text>
        </Button>
        </Content>
      </Container>
    
      
    );
  }
}

