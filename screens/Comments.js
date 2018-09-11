import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Right, Button, Text } from 'native-base';

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
          <Button rounded full
            onPress={() => {
                this.props.navigation.navigate('Drawer');
            }}>
            <Text style={{ color: 'white' }}>Post</Text>
        </Button>
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