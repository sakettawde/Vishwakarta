import React from 'react';
import { StyleSheet, Text, View ,Alert} from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label } from 'native-base';
import { AddProfUrl } from "../assets/ApiUrl";


export default class AddProf extends React.Component {
  state={
   prof:""
  }


  addProfApi = () =>{
    console.log("In AddProfApi",this.state.prof)
    fetch(AddProfUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:this.state.prof
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("AddGotra Response", data)
        if(data.message=="Profession Added"){
          this.props.navigation.state.params.updateProf()  
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
        <Header ><Text style={styles.headline}>Add New Profession</Text></Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Enter your Profession</Label>
              <Input onChangeText={(text)=>{this.setState({prof:text})}} />
            </Item>
            
            <Button rounded full
                onPress={()=>this.addProfApi()}>
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