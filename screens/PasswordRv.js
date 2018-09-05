import React from 'react';
import { StyleSheet, Text, View ,Alert} from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label } from 'native-base';
import { Passrv } from "../assets/ApiUrl";

export default class PasswordRv extends React.Component {

  state={
    mob_num:""
  }

  PassrvApi = () =>{
    console.log("In PassrvApi")
    fetch(Passrv, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        u_number: phno``
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("Passrv Response", data)
        if(data.message=="Correct number"){
          this.props.navigation.navigate('OtpScreen')
                  
        }
        else if(data.message){
          Alert.alert(data.message)
        }
          
      })
  
    }
  render() {
    return (
      <Container>
        <Header ><Text style={styles.headline}>Password Recovery</Text></Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Mobile Number</Label>
              <Input onChangeText={(text)=>{this.setState({mob_num:text})}} 
                    keyboardType = 'numeric' maxLength={10}/>
            </Item>
            
            <Button rounded full
                onPress={() => this.PassrvApi()}>
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
