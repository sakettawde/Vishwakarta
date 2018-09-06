import React from 'react';
import { StyleSheet,  View, AsyncStorage,Alert } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label , Button, Text, Left, Right,Image} from 'native-base';
import { ImagePicker } from 'expo';
import { Signup } from "../assets/ApiUrl";



export default class SignupScreen2 extends React.Component{
 
  state = {
    image: null,
    home_pin: "",
    current_pin: ""
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
    this.SignupApi();
    
  }


  // _retrieveData = async () => {
  //   try {
  //     this.info_array.name = await AsyncStorage.getItem('name');
  //     if (this.info_array.name !== null) {
  //       console.log(this.info_array.name);
  //     }

  //     this.info_array.mobile_num = await AsyncStorage.getItem('mobile_num');

  //     this.info_array.password = await AsyncStorage.getItem('password');
      
  //     this.info_array.birthdate = await AsyncStorage.getItem('birthdate');
  //     if (this.info_array.birthdate!== null) {
  //       console.log(this.info_array.birthdate);
  //     }
      
  //     const value = await AsyncStorage.getItem('toggle');
  //     if(value!==null){
  //       if (value=='true'){
  //         this.info_array.toggle="Business"
  //       }
  //       else{
  //         this.info_array.toggle="Employee"
  //       }
          
  //     }
  //     this.info_array.profession = await AsyncStorage.getItem('prof');
  //     this.info_array.gotra = await AsyncStorage.getItem('gotra');

  //    } catch (error) {
  //      // Error retrieving data
  //    }
  // }

 

  SignupApi = () =>{

    if(this.state.home.length < 5){
      Alert.alert("Enter Valid Pincode")
      return
    }
    if(this.state.current.length < 5){
      Alert.alert("Enter Valid Pincode")
      return
    }

    console.log("In SignupApi")
    fetch(Signup, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:this.info_array.name,
        mobile_no: this.info_array.mobile_num,
        password: this.info_array.password,
        dob:this.info_array.birthdate,
        status:this.info_array.toggle,
        professional:this.info_array.profession,
        home_pincode:this.state.home,
        current_pincode:this.state.current,
        gotra:this.info_array.gotra
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("Signup Response", data)
        if(data.message=="Registration succesfully "){
          this.props.navigation.navigate('Drawer')
        }          
        else{
          Alert.alert(data.message)
        }
      })
      .catch((error)=>{
        console.log("Api call error");
        console.log(error.message);
     });
  
    }
    // componentDidMount(){
    //   this._retrieveData()
    // }
    PincodeApi=()=>{
      fetch('http://35.161.99.113:9000/webapi/vishwkartalogin/pinCode', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pincode:pin
        })
    }).then(data => {
        return data.json();
    }).then(record => {
     
         console.log("data of pincode",record.record.PostOffice)
      this.setState({pincodeData:record.record.PostOffice})
          if(record.record.PostOffice){
            console.log("data is available")
          }else{
            console.log("No User")
            this.setState({pincodeData:[]})
          }
    })
  }


home_handler=(text)=>{
  this.setState({home_pin:text})
  console.log(text)
  if(text.length < 6){
    return
  }


}

    render() {
        let { image }=this.state;
        this.info_array.name = this.props.navigation.getParam('name', '');
        this.info_array.mobile_num = this.props.navigation.getParam('mobile_num', '');
        this.info_array.birthdate = this.props.navigation.getParam('birthdate', '');
        const value = this.props.navigation.getParam('toggle', '');
        if (value=='true'){
          this.info_array.toggle="Business"
        }
        else{
          this.info_array.toggle="Employee"
        }

        this.info_array.profession = this.props.navigation.getParam('profession', '');
        this.info_array.gotra = this.props.navigation.getParam('gotra', '');
        

        return (
          <Container>
            <Header ><Text>SignUp </Text></Header>
            <Content>
              <Form>
              <Item stackedLabel>
              <Label>Home Location Pincode</Label>
              <Input onChangeText={(text)=>this.home_handler(text)}
                    keyboardType = 'numeric' maxLength={6} />
            </Item>
            
            <Item stackedLabel >
              <Label>Current Location Pincode</Label>
              <Input onChangeText={(text)=>this.setState({current_pin:text})}
                  keyboardType = 'numeric' maxLength={6}/>
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
            onPress={() => this.check_func()}>
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