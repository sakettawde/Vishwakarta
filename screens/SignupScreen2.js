import React from 'react';
import { StyleSheet,  View } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label , Button ,DatePicker, Text, Left, Right 
, Radio, Picker,Icon} from 'native-base';

export default class SignupScreen2 extends React.Component{
    render() {
        return (
          <Container>
            <Header ><Text>SignUp </Text></Header>
            <Content>
              <Form>
              <Item stackedLabel>
              <Label>Home Location Pincode</Label>
              <Input/>
            </Item>
            
            <Item stackedLabel >
              <Label>Current Location Pincode</Label>
              <Input />
            </Item>
            <Item stackedLabel Last>
              <Label>Profile Picture</Label>
              <Right>
              <Button><Text>Upload</Text></Button>
              </Right>
            </Item>
                </Form>
            <Button
            rounded
            full
            onPress={() => {
                this.props.navigation.navigate('Drawer');
            }}>
            <Text style={{ color: 'white' }}>SignUp</Text>
        </Button>
            </Content>
          </Container>
        
          
        );
      }
}