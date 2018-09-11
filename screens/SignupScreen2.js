import React from 'react';
import { StyleSheet,  View, ScrollView,Alert ,Dimensions, TouchableOpacity,Image } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label , Button, Text, Left, Right, Picker,Icon, List, ListItem} from 'native-base';
import { ImagePicker } from 'expo';
//import Table from 'react-native-simple-table'
//import { Table, Row, Rows } from 'react-native-table-component';

import { Signup , PincodeUrl } from "../assets/ApiUrl";





export default class SignupScreen2 extends React.Component{
 
  static navigationOptions = {
    title: 'Signup',
  };

  state = {
    image: null,
    home_pin: "",
    hvillage:"",
    htaluka:"",
    hdistrict:"",
    hstate:"",
    current_pin: "",
    cvillage:"",
    ctaluka:"",
    cdistrict:"",
    cstate:"",
    showhome:false,
    homedata:false,
    showcurrent:false,
    currentdata:false,
    pincodeData:[],
    

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
    //console.log("Code here")
    console.log(this.info_array)
    this.SignupApi();
    
  }


  
 

  SignupApi = () =>{

    if(this.state.home_pin.length < 5){
      Alert.alert("Enter Valid Pincode")
      return
    }
    if(this.state.current_pin.length < 5){
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
        gotra:this.info_array.gotra,
        hvillage:this.state.hvillage,
        htaluka:this.state.htaluka,
        hdistrict:this.state.hdistrict,
        hstate:this.state.hstate,
        cvillage:this.state.cvillage,
        ctaluka:this.state.ctaluka,
        cdistrict:this.state.cdistrict,
        cstate:this.state.cstate,
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
       // console.log("Signup Response", data)
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

    
pincodeApi=(pin)=>{
      fetch(PincodeUrl, {
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
    }).then(data => {
     
      //console.log("data of pincode",data.record.PostOffice)
     // console.log(pin)
      this.setState({pincodeData:data.record.PostOffice})
          if(data.record.PostOffice){
            console.log("data is available")
          }else{
            Alert.alert('Wrong Pincode')
            this.setState({pincodeData:[]})
          }
    })
  }


home_handler=(text)=>{
  this.setState({home_pin:text})
  //console.log(text)
  if(text.length < 6){
    this.setState({pincodeData:[]})
  }
  else{
  this.pincodeApi(text)
  this.setState({showhome:true})
  }
}

selectedHomePincode=(item)=>{
  //console.log('in home onPress')
  //console.log(item)
  this.setState({hvillage:item.Name})
  this.setState({htaluka:item.Taluk})
  this.setState({hdistrict:item.District})
  this.setState({hstate:item.State})
  this.setState({showhome:false})
  this.setState({homedata:true})
}

current_handler=(text)=>{
  this.setState({current_pin:text})
 // console.log(text)
  if(text.length < 6){
    this.setState({pincodeData:[]})
  }
  else{
  this.pincodeApi(text)
  this.setState({showcurrent:true})
  }
}
selectedCurrentPincode=(item)=>{
  //console.log('in onPress')
  //console.log(item)
  this.setState({cvillage:item.Name})
  this.setState({ctaluka:item.Taluk})
  this.setState({cdistrict:item.District})
  this.setState({cstate:item.State})
  this.setState({showcurrent:false})
  this.setState({currentdata:true})
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
            {/* <Header ><Text>SignUp </Text></Header> */}
            <Content>
              <Form>
              <Item stackedLabel>
              <Label>Home Location Pincode</Label>
              <Input onChangeText={(text)=>this.home_handler(text)}
                    keyboardType = 'numeric' maxLength={6} />
            </Item>

          {this.state.showhome && this.state.pincodeData && this.state.pincodeData.length > 0 ?(

            <ScrollView >
            <List>
              <ListItem itemHeader style={{flexDirection:"row",justifyContent:"space-evenly"}}  >
                  <Text>Name</Text>
                  <Text>Taluka</Text>
                  <Text>District</Text>
                  <Text>State</Text>
              </ListItem>

              {this.state.pincodeData.map((item,index)=>(
                      <ListItem key={index} style={{flexDirection:"row",justifyContent:"space-evenly"}} >
                      
                      <TouchableOpacity onPress={()=>this.selectedHomePincode(item)}><Text>{item.Name}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectedHomePincode(item)}><Text>{item.Taluk}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectedHomePincode(item)}><Text>{item.District}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectedHomePincode(item)}><Text>{item.State}</Text></TouchableOpacity>
                      </ListItem>
              ))}
            </List>
            </ScrollView>
          ):(<View></View>)}     
           
          {this.state.homedata && 
          <Item stackedLabel>
          <Label>Home Address</Label>
          <Input editable={false} placeholder={this.state.hvillage+", "+this.state.htaluka
               +", "+this.state.hdistrict+", "+this.state.hstate}
        multiline={true}/> 
          </Item>
          }



           <Item stackedLabel >
              <Label>Current Location Pincode</Label>
              <Input onChangeText={(text)=>this.current_handler(text)}
                  keyboardType = 'numeric' maxLength={6}/>
            </Item>

                {this.state.showcurrent && this.state.pincodeData && this.state.pincodeData.length > 0 ?(

            <ScrollView >
            <List>
              <ListItem itemHeader style={{flexDirection:"row",justifyContent:"space-evenly"}}  >
                  <Text>Name</Text>
                  <Text>Taluka</Text>
                  <Text>District</Text>
                  <Text>State</Text>
              </ListItem>

              {this.state.pincodeData.map((item,index)=>(
                      <ListItem key={index} style={{flexDirection:"row",justifyContent:"space-evenly"}} >
                      
                        <TouchableOpacity onPress={()=>this.selectedCurrentPincode(item)}><Text>{item.Name}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectedCurrentPincode(item)}><Text>{item.Taluk}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectedCurrentPincode(item)}><Text>{item.District}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.selectedCurrentPincode(item)}><Text>{item.State}</Text></TouchableOpacity>
                      </ListItem>
              ))}
            </List>
            </ScrollView>
             ):(<View></View>)}

             {this.state.currentdata && 
          <Item stackedLabel>
          <Label>Current Address</Label>
          <Input editable={false} placeholder={this.state.cvillage+", "+this.state.ctaluka
               +", "+this.state.cdistrict+", "+this.state.cstate}
        multiline={true}/> 
          </Item>
          }

            <Item stackedLabel Last>
              <Label>Profile Picture</Label>
              
              <Right>
              <Button onPress={this._pickImage}><Text>Upload</Text></Button>
              </Right>
              {image && <Text>Uploaded</Text>}
              
            </Item>
            <Item>
              <View><Image source={{uri: this.state.image}} 
                  style={{flex:1 ,height:300, width: Dimensions.get('window').width}}/>
                  </View>
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
    
        console.log(result.uri);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };
}

 const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});