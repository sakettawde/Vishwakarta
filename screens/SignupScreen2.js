import React from 'react';
import { StyleSheet,  View, ScrollView,Alert ,Dimensions, TouchableOpacity,Image,ActivityIndicator } from 'react-native';
import {Container,  Content, Form, Item, Input, Label , Button, Text, Left, Right, Picker,Icon, List, ListItem} from 'native-base';
import { ImagePicker ,LinearGradient,Permissions} from 'expo';
import {NextButton,ButtonText,ScreenTitle,FlexColumn} from '../utils/styles';
import ActionSheet from 'react-native-actionsheet';
import uuid from 'uuid';
import * as firebase from 'firebase';





import { Signup , PincodeUrl } from "../assets/ApiUrl";

// let config = firebase.initializeApp({
//   apiKey: "AIzaSyCm0jK5vNR0ReGioasbburhDboFMqoVvM0",
//   authDomain: "viswakarta-chat.firebaseapp.com",
//   databaseURL: "https://viswakarta-chat.firebaseio.com",
//   projectId: "viswakarta-chat",
//   storageBucket: "viswakarta-chat.appspot.com",
//   messagingSenderId: "373273139171"
// });




export default class SignupScreen2 extends React.Component{
 
  static navigationOptions = {
    title: 'Signup',
    headerBackTitleVisible :true
  };

  state = {
    image_loading: false,
    imageurl:null,
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


  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
}

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
    let temp='http://www.myiconfinder.com/uploads/iconsets/256-256-f86ca6f98affc4bfe9306d9693638920.png'
    if(this.state.imageurl){
      temp=this.state.imageurl
    }

    console.log(this.info_array);
    console.log(temp);
     this.SignupApi(temp);
    
  }
  showActionSheet = () => {
    this.ActionSheet.show();
  };


  
 

  SignupApi = (avatar) =>{

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
        home_pincode:this.state.home_pin,
        current_pincode:this.state.current_pin,
        gotra:this.info_array.gotra,
        hvillage:this.state.hvillage,
        htaluka:this.state.htaluka,
        hdistrict:this.state.hdistrict,
        hstate:this.state.hstate,
        cvillage:this.state.cvillage,
        ctaluka:this.state.ctaluka,
        cdistrict:this.state.cdistrict,
        cstate:this.state.cstate,
        avatar:avatar      
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
       // console.log("Signup Response", data)
        if(data.message=="Registration succesfully "){
          this.props.navigation.navigate('Login')
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
  this.setState({hvillage:item.Name,htaluka:item.Taluk,hdistrict:item.District,
  hstate:item.State,showhome:false,
  homedata:true})
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
  this.setState({cvillage:item.Name,ctaluka:item.Taluk,
  cdistrict:item.District, cstate:item.State,
  showcurrent:false, currentdata:true})
}

    render() {
        this.info_array.name = this.props.navigation.getParam('name', '');
        this.info_array.mobile_num = this.props.navigation.getParam('mobile_num', '');
        this.info_array.password = this.props.navigation.getParam('password', '');
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
              <Button iconLeft light onPress={()=>this.showActionSheet()}>
            <Icon name='md-add' />
            <Text>Upload</Text>
          </Button>
              </Right>
              {this.state.imageurl && <Text>Uploaded</Text>}
              
            </Item>


            <Item>
              <View><Image source={{uri: this.state.imageurl}} 
                  style={{flex:1 ,height:300, width: Dimensions.get('window').width}}/>
                  </View>
            </Item>
          </Form>
          
          
          
          {this.state.image_loading && <ActivityIndicator size="large"/>}
            <NextButton 
          onPress={()=>this.check_func()}
          style={{marginTop: 10,marginBottom: 10,}}  
          disabled={this.state.image_loading}
          >
          <LinearGradient
                colors={["#7c98fd", "#4e43f9"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                style={{ width: "100%", height: "100%",borderRadius:10}}
              >

            <ButtonText>SignUp</ButtonText>
          </LinearGradient>
        </NextButton>
        <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: 100,
        }}>
        
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          options={['Take a photo', 'Choose from Camera Roll', 'cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={index => this.handleImageSource(index)}
        />
      </View>
            </Content>
          </Container>
        
          
        );
      }
      handleImageSource=(index)=>{
        if(index==1){
          this._pickImage()
        }
        if(index==0){
          this._takePhoto()
        }
        console.log(index)
      }
      _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        this._handleImagePicked(pickerResult);
    };
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
       console.log(result.uri);
        this._handleImagePicked(result);   

      };
      _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });
  
            if (!pickerResult.cancelled) {
              this.setState({ image_loading: true  });
                uploadUrl = await uploadImageAsync(pickerResult.uri);
                console.log(uploadUrl)
                this.setState({ imageurl: uploadUrl , image_loading:false });
            }
        } catch (e) {
            console.log(e);
            alert('Upload failed, sorry :(');
        } finally {
            this.setState({ uploading: false });
        }
    };

     }

    

  async function uploadImageAsync(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = firebase
        .storage()
        .ref()
        .child("images/" + uuid.v4());

    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
}

 const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});