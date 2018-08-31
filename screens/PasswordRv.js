import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label } from 'native-base';

export default class PasswordRv extends React.Component {
  render() {
    return (
      <Container>
        <Header ><Text style={styles.headline}>Password Recovery</Text></Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Mobile Number</Label>
              <Input />
            </Item>
            
            <Button rounded full
                onPress={() => {  
                this.props.navigation.navigate('OtpScreen');
              }}>
          <Text style={{ color: 'white' }}>Next</Text>
        </Button>
          </Form>
        </Content>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline:{
    fontSize: 25,
    color: 'white'
  }
});
