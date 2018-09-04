import React from 'react';
import { StyleSheet,  View, AsyncStorage } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label , Button, Text, Left, Right,Image} from 'native-base';
import { ImagePicker } from 'expo';
import { Signup } from "../assets/ApiUrl";



export default class SignupScreen2 extends React.Component{
 
  state = {
    image: null,
    home: "",
    current: ""
  };
  info_array={
    name:"",
    mobile_num:"",
    password:"",
    birthdate:"",
    toggle:"",
    profession:"",
    gotra:""
}


  check_func=()=>{
    console.log("Code here")
    console.log(this.info_array)
    this.SignupApi(this.info_array.name,this.info_array.mobile_num,this.info_array.password,
      this.info_array.birthdate,this.info_array.toggle,this.info_array.profession,
      this.state.home,this.state.current,this.info_array.gotra );
    //this.props.navigation.navigate('Drawer')
  }


  _retrieveData = async () => {
    try {
      this.info_array.name = await AsyncStorage.getItem('name');
      if (this.info_array.name !== null) {
        console.log(this.info_array.name);
      }

      this.info_array.mobile_num = await AsyncStorage.getItem('mobile_num');

      this.info_array.password = await AsyncStorage.getItem('password');
      
      this.info_array.birthdate = await AsyncStorage.getItem('birthdate');
      if (this.info_array.birthdate!== null) {
        console.log(this.info_array.birthdate);
      }
      
      const value = await AsyncStorage.getItem('toggle');
      if(value!==null){
        if (value=='true'){
          this.info_array.toggle="Business"
        }
        else{
          this.info_array.toggle="Employee"
        }
          
      }
      this.info_array.profession = await AsyncStorage.getItem('prof');
      this.info_array.gotra = await AsyncStorage.getItem('gotra');

     } catch (error) {
       // Error retrieving data
     }
  }

  SignupApi = () =>{
    console.log("In SignupApi")
    fetch(Signup, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:this.info_array.name,
        // mobile_no: mobile_no,
        // password: password,
        // dob:dob,
        // status:status,
        // professional:professional,
        // home_pincode:home_pincode,
        // current_pincode,current_pincode,
        // gotra:gotra
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("Signup Response", data)          
      })
  
    }
    componentDidMount(){
      this._retrieveData()
    }


    render() {
        let { image }=this.state; 
        return (
          <Container>
            <Header ><Text>SignUp </Text></Header>
            <Content>
              <Form>
              <Item stackedLabel>
              <Label>Home Location Pincode</Label>
              <Input onChangeText={(text)=>this.setState({home:text})}/>
            </Item>
            
            <Item stackedLabel >
              <Label>Current Location Pincode</Label>
              <Input onChangeText={(text)=>this.setState({current:text})}/>
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
            onPress={() => this.SignupApi()}>
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