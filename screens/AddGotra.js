import React from 'react';
import { StyleSheet, Text, View ,Alert} from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label } from 'native-base';
import { AddGotraUrl } from "../assets/ApiUrl";


export default class AddGotra extends React.Component {
  state={
   gotra:""
  }


  addGotraApi = () =>{
    console.log("In AddGotraApi",this.state.gotra)
    fetch(AddGotraUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:this.state.gotra
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("AddGotra Response", data)
        if(data.message=="Gotra Added"){
          this.props.navigation.state.params.updateGotra()  
          this.props.navigation.navigate('SignupScreen')
                  
        }
        else {
          Alert.alert(data.message)
        }
          
      })
      .catch((error)=>{
        console.log("Api call error");
        console.log(error.message);
     });
  
    }

    

  render() {
    

    return (
      <Container>
        <Header ><Text style={styles.headline}>Add New Gotra</Text></Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Enter your Gotra</Label>
              <Input onChangeText={(text)=>{this.setState({gotra:text})}} />
            </Item>
            
            <Button rounded full
                onPress={()=>this.addGotraApi()}>
          <Text style={{ color: 'white' }}>Add</Text>
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
