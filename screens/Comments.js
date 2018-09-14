import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Right, Button, Text } from 'native-base';
import {NextButton,ButtonText ,FlexColumn,ScreenTitle} from "../utils/styles";
import {LinearGradient} from 'expo';


export default class Comments extends Component {
    state = {
        image: null,
      };
  render() {
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          <Form>
            <Item stackedLabel last>
              <Label>Comment</Label>
              <Input multiline={true} numberOfLines={8} />
            </Item>
          </Form>
        <NextButton 
          onPress={() => {
            this.props.navigation.navigate('Drawer');}}
          style={{marginTop: 10,}}  
          >
          <LinearGradient
                colors={["#7c98fd", "#4e43f9"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                style={{ width: "100%", height: "100%",borderRadius:10}}
              >

            <ButtonText>Post</ButtonText>
          </LinearGradient>
        </NextButton>

        </Content>
      </Container>
    );
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64:true,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}