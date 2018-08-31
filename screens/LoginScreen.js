import React, { Component  } from 'react';
import { StyleSheet, View  } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label ,Title , Button ,Text } from 'native-base';
export default class LoginScreen extends Component {
  
 
  
  render() {
    return (
      <Container style={{paddingTop: 23}}>
        <Header style={{paddingTop: 20}}> 
        <Title>Login</Title>
        </Header>
        <Content >
          <Form >
            <Item stackedLabel>
              <Label>Username</Label>
              <Input /> 
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
           
          </Form>
          <Button full onPress={() => {this.props.navigation.navigate('Feed')}} >
            <Text>Login</Text>
          </Button>
              
          <View style={{flex : 1 , flexDirection : 'row' }}>
            <Text style={styles.container} onPress={()=>{this.props.navigation.navigate('SignupScreen')}}>
            SignUp</Text>
                       
            <Text style={styles.container } onPress={()=>{this.props.navigation.navigate('PasswordRv')}}>
              Forget Password</Text>
            
          </View>
        </Content>
        
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf : 'center',
    justifyContent: 'center',
  },
});