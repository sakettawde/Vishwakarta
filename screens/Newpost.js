import React, { Component } from 'react';
import { Container, Icon, Content, Form, Item, Input, Label, Right, Button, Text } from 'native-base';
import {AsyncStorage,View,Image,Dimensions,KeyboardAvoidingView,Alert, ActivityIndicator} from 'react-native'
import { ImagePicker ,LinearGradient,Permissions} from 'expo';
import {NextButton,ButtonText,ScreenTitle,FlexColumn} from '../utils/styles';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import * as firebase from 'firebase';
import {Addfeed} from "../assets/ApiUrl";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class Newpost extends Component {
    state = {
        image: null,
        imageurl:null,
        image_array:[],
        url_array:[],
        tab:"",
        user_id:"",
        user_name:"",
        caption:"",
        loading_image:false
      };
      

    componentDidMount(){
      let temp = this.props.navigation.getParam('tab', '');
      this.setState({tab:temp});
      console.log(temp);
      this._retrieveData()

    }
    _retrieveData = async () => {
      try {
        console.log('Retriving AsyncStorge')
        const value = await AsyncStorage.getItem('user_id');
        this.setState({user_id:value})
        const value2=await AsyncStorage.getItem('user_name');
        this.setState({user_name:value2})
        console.log("id ",value)
        console.log("name ",value2)
        
       } catch (error) {
         console.log(error)
       }
    }
    AddfeedApi = () => {
      console.log("In AddfeedApi")
      
      fetch(Addfeed, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status:this.state.caption,
          userId:this.state.user_id,
          imageData:this.state.url_array,
          date:moment().format('LL')

        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("Addfeed Response", data)
  
          if (data.message == "Status Posted") {
            console.log("Success")
            this.props.navigation.navigate("Drawer")
          } else if (data.message) {
            Alert.alert(data.message)
          }
        }).catch((error)=>{
      console.log("Api call error");
      console.log(error.message);
   });
  }

  caption_handler=(text)=>{
    console.log(text);
    this.setState({caption:text});
  }
  render() {
    return (
    
       <KeyboardAwareScrollView >
          <Form >
            <Item stackedLabel>
              <Label>Select Image</Label>
              <Right>
              <Button iconLeft light onPress={()=>this._pickImage()}>
            <Icon name='md-add' />
            <Text>Select Image</Text>
          </Button>
              </Right>
            </Item>
            
           

            
            <Item stackedLabel last >
              <Label>Caption</Label>    
              <Input multiline={true} numberOfLines={8} onChangeText={(text)=>this.caption_handler(text)}/>
                       
            </Item>
          </Form>
          {this.state.loading_image && <ActivityIndicator size="large"/>}
          <NextButton 
          onPress={() =>this.AddfeedApi()}
          style={{marginTop: 10,marginBottom:10,}} 
          disabled={this.state.loading_image} 
          >
          <LinearGradient
                colors={["#7c98fd", "#4e43f9"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                style={{ width: "100%", height: "100%",borderRadius:10}}
              >

            <ButtonText>Post</ButtonText>
          </LinearGradient>
        </NextButton>
        

        {this.state.imageurl &&
              <Swiper style={{height:200, width:Dimensions.get('window').width}} loop={false} >
              
            {this.state.url_array.map((item,index)=>
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center',height:200}} key={index}>
            <Image source={{uri: item}} 
            style={{flex:1 ,height: 200, width: Dimensions.get('window').width}}/>
          </View>
            )  
            
            }
            </Swiper>
            }
          </KeyboardAwareScrollView>

    );
  }
  _pickImage = async () => {
    this.setState({loading_image:true})
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
   console.log(result.uri);
   this.setState({ image: result.uri });
    this._handleImagePicked(result); 
      

  };
  _handleImagePicked = async pickerResult => {
    try {
       

        if (!pickerResult.cancelled) {
          let location="images/feed/"+this.state.user_id+"_"+moment().format();
          this.state.image_array.push(pickerResult.uri);
            uploadUrl = await uploadImageAsync(pickerResult.uri,location);
            this.state.url_array.push(uploadUrl);
            console.log("url array ",this.state.url_array)
            this.setState({ imageurl: uploadUrl , loading_image:false });
        }
    } catch (e) {
        console.log(e);
        alert('Upload failed, sorry :(');
    } finally {
        this.setState({ uploading: false });
    }
};

 }



async function uploadImageAsync(uri,location) {
const response = await fetch(uri);
const blob = await response.blob();

console.log(location)
const ref = firebase
    .storage()
    .ref()
    .child(location);

const snapshot = await ref.put(blob);
console.log(snapshot.downloadURL)
return snapshot.downloadURL;
}
