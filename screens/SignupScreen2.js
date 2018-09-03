import React from 'react';
import { StyleSheet,  View } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label , Button, Text, Left, Right,Image} from 'native-base';
import { ImagePicker } from 'expo';



export default class SignupScreen2 extends React.Component{
 
  state = {
    image: null,
  };

    render() {
        let { image }=this.state; 
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
              <Button onPress={this._pickImage}><Text>Upload</Text></Button>
              </Right>
              {image && <Text>Uploaded</Text>}
            </Item>
          </Form>

            <Button rounded full
            onPress={() => {
                this.props.navigation.navigate('Drawer');
            }}>
            <Text style={{ color: 'white' }}>SignUp</Text>
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