import React from 'react';
import { StyleSheet,  View, ScrollView,Alert ,FlatList, TouchableOpacity,Image,ActivityIndicator } from 'react-native';
import {Container,  Content, Form, Item, Input, Label , Button, Text, Left, Right, Picker,Icon, List, ListItem, Radio, Card, CardItem} from 'native-base';
import { ImagePicker ,LinearGradient,Permissions,ImageManipulator} from 'expo';
import {LoginButton,ButtonText2 ,FlexColumn,ScreenTitle,FlexRow
  ,StyledTextInput,TextField,TextLabel} from "../utils/styles";
import ActionSheet from 'react-native-actionsheet';
import uuid from 'uuid';
import * as firebase from 'firebase';





import { Signup , PincodeUrl } from "../assets/ApiUrl";
import Body from '../native-base-theme/components/Body';

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
    isTemple:false,
    enableScrollViewScroll:true,    

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
    let role='user'
    if(this.state.isTemple){
      role='temple'
    }

    console.log(this.info_array);
    console.log(temp);
     this.SignupApi(temp,role);
    
  }
  showActionSheet = () => {
    this.ActionSheet.show();
  };


  
 

  SignupApi = (avatar,role) =>{

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
        avatar:avatar,
        role:role      
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
  this.setState({showhome:true,enableScrollViewScroll:false})
  }
}

selectedHomePincode=(item)=>{
  //console.log('in home onPress')
  //console.log(item)
  this.setState({hvillage:item.Name,htaluka:item.Taluk,hdistrict:item.District,
  hstate:item.State,showhome:false,enableScrollViewScroll:true,
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
  this.setState({showcurrent:true,enableScrollViewScroll:false})
  }
}
selectedCurrentPincode=(item)=>{
  //console.log('in onPress')
  //console.log(item)
  this.setState({cvillage:item.Name,ctaluka:item.Taluk,
  cdistrict:item.District, cstate:item.State,enableScrollViewScroll:true,
  showcurrent:false, currentdata:true})
}
_onPressHandle=()=>{
  this.setState({isTemple:!this.state.isTemple})
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
          
         
            <LinearGradient
          colors={["#00aa8a", "#00b392"]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          style={{ width: "100%", height: "100%"}}
        >
        <ScrollView scrollEnabled={this.state.enableScrollViewScroll}>
        
            <FlexColumn style={{paddingBottom: 20,}}>
              
             
            <TextField style={{alignSelf: 'center',marginTop: 12,}}>
            <FlexRow style={{alignItems:"center",}}>
              <TextLabel>Home Pincode</TextLabel>
              <StyledTextInput
              selectionColor="#3f51b5"
              underlineColorAndroid="transparent"
              onChangeText={(text)=>this.home_handler(text)}
                    keyboardType = 'numeric' maxLength={6}
              />
            </FlexRow>
            </TextField> 

          {this.state.showhome && this.state.pincodeData && this.state.pincodeData.length > 0 ?(
           

                  <FlatList style={{paddingVertical: 10,paddingBottom:20,height:300}}
                  scrollEnabled={true}
                  keyExtractor={(item)=>{
                  return item.Name;
                  }}              
                  data={this.state.pincodeData}

                  renderItem={({item})=>

                  <Card style={{marginRight:5,marginLeft:5,marginTop:3}} >
                  <CardItem button onPress={()=>this.selectedHomePincode(item)}>
                  <Icon active name="md-locate" />
                  <View style={{flexDirection:'column'}}>
                  <Text>{item.Name}</Text>
                  <Text note>{item.Taluk} , {item.District}</Text>
                  <Text note>{item.State}</Text>
                  </View>
                  </CardItem>
                  </Card>
                  }/>
                
          ):(<View></View>)}     
           
         
          {this.state.homedata && 
          <TextField style={{alignSelf: 'center',marginTop: 12,}}>
            <FlexRow style={{alignItems:"center",}}>
              <TextLabel>Home Address</TextLabel>
              <View style={{flexDirection:'column'}}>
                  <Text style={{color:'#fff'}}>{this.state.hvillage}</Text>
                  <Text note style={{color:'#fff'}}>{this.state.htaluka} , {this.state.hdistrict}</Text>
                  <Text note style={{color:'#fff'}}>{this.state.hstate}</Text>
                  </View>
              </FlexRow></TextField>
          }


    
            <TextField style={{alignSelf: 'center',marginTop: 12,}}>
            <FlexRow style={{alignItems:"center",}}>
              <TextLabel>Current Pincode</TextLabel>
              <StyledTextInput
              selectionColor="#3f51b5"
              underlineColorAndroid="transparent"
              onChangeText={(text)=>this.current_handler(text)}
                    keyboardType = 'numeric' maxLength={6}
              />
            </FlexRow>
            </TextField> 

       

             {this.state.showcurrent && this.state.pincodeData && this.state.pincodeData.length > 0 ?(
               <FlatList style={{paddingVertical: 10,paddingBottom:20,height:300}}
                  keyExtractor={(item)=>{
                  return item.Name;
                }}              
                data={this.state.pincodeData}
                
                renderItem={({item})=>
               
               <Card style={{marginRight:5,marginLeft:5,marginTop:3}} >
               <CardItem button onPress={()=>this.selectedCurrentPincode(item)}>
                 <Icon active name="md-locate" />
                 <View style={{flexDirection:'column'}}>
                 <Text>{item.Name}</Text>
                 <Text note>{item.Taluk} , {item.District}</Text>
                 <Text note>{item.State}</Text>
                 </View>
                </CardItem>
              </Card>
                
              }/>
             ):(<View/>)}

            
           {this.state.currentdata && 
          <TextField style={{alignSelf: 'center',marginTop: 12,}}>
            <FlexRow style={{alignItems:"center",}}>
              <TextLabel>Current Address</TextLabel>
              <View style={{flexDirection:'column'}}>
                  <Text style={{color:'#fff'}}>{this.state.cvillage}</Text>
                  <Text note style={{color:'#fff'}}>{this.state.ctaluka} , {this.state.cdistrict}</Text>
                  <Text note style={{color:'#fff'}}>{this.state.cstate}</Text>
                  </View>
              </FlexRow></TextField>
          }
          <TextField style={{alignSelf: 'center',marginTop: 12,}}>
          <View style={{flexDirection:'row',flex:1,justifyContent:"space-between",padding:10}}>
                  <View style={{flexDirection:'row',flex:2}}>
                  <Text style={{color:'#fff'}}>Do you represent any Temple?</Text>
                  </View>
                  
                  <View style={{flexDirection:'column',flex:1}}>
                  <View style={{flexDirection:'row',flex:1,justifyContent:"space-between"}}>
                  <Radio selected={this.state.isTemple} onPress={this._onPressHandle} selectedColor='#007a5d'/>
                  <Text style={{color:'#fff'}}>Yes</Text>
                  </View>
                  <View style={{flexDirection:'row',flex:1,justifyContent:"space-between"}}>
                  <Radio selected={!this.state.isTemple} onPress={this._onPressHandle} selectedColor='#007a5d'/>
                  <Text style={{color:'#fff'}}>No</Text>
                  </View>
                  </View>
                 
              </View>
            </TextField>
 

             <TextField style={{alignSelf: 'center',marginTop: 12,}}>
            <FlexRow style={{alignItems:"center",}}>
              <TextLabel>Profile Picture</TextLabel>
              <Button iconLeft light onPress={()=>this.showActionSheet()}>
                <Icon name='md-add' />
                <Text>Upload</Text>
              </Button>
            </FlexRow>
            </TextField>   

             {this.state.imageurl && 
            
              <Image source={{uri: this.state.imageurl}} 
                  style={{marginBottom:15, marginTop:15,height:100,width:100 ,borderRadius:50,alignSelf:"center"}}/>
            }
         
          
          
          
          {this.state.image_loading && <ActivityIndicator size="large"/>}
        
        <LoginButton 
          onPress={()=>this.check_func()}
          style={{marginTop: 10,marginBottom:20}} 
          disabled={this.state.image_loading} 
          >
         

            <ButtonText2>SignUp</ButtonText2>
          
        </LoginButton>
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
      
            </FlexColumn>
            </ScrollView>    
        </LinearGradient>
        
       
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
            aspect: [1, 1],
        });

        this._handleImagePicked(pickerResult);
    };
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
        });
       console.log(result.uri);
        this._handleImagePicked(result);   

      };
      _handleImagePicked = async pickerResult => {
        try {
            this.setState({ uploading: true });
  
            if (!pickerResult.cancelled) {
              this.setState({ image_loading: true  });
              const compress_image=await ImageManipulator.manipulate(pickerResult.uri,[{ resize: {  height: 160 } }],{compress:0,format:'png'})
              console.log(compress_image)
  
                uploadUrl = await uploadImageAsync(compress_image.uri);
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
        .child("profilePic/" + uuid.v4());

    const snapshot = await ref.put(blob);
    return snapshot.downloadURL;
}

 const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});