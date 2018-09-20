import React, { Component } from 'react';
import { Container, Icon, Content, Form, Item, Input, Label, Right, Button, Text } from 'native-base';
import {AsyncStorage,View,Dimensions,Alert, ActivityIndicator} from 'react-native'
import { LinearGradient,Permissions} from 'expo';
import {NextButton,ButtonText,ScreenTitle,FlexColumn} from '../utils/styles';




export default class Newpost extends Component {
    state = {
        url:"",
        user_id:"",
        header:"",
        loading:false
      };
      

    

    AddfeedApi = (link) => {
      console.log("In AddfeedApi")
      
      fetch(link, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status:this.state.caption,
          userId:this.state.user_id,
          imageData:this.state.url_array,

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
    this.setState({header:text});
  }

  postHandler=()=>{
   
     // this.AddfeedApi(AddMyfeed)
    //  console.log(this.state.url.replace('watch?v=','embed/'))
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = this.state.url.match(regExp);
        if (match && match[2].length == 11) {
        console.log(match[2]);
        console.log("https://www.youtube.com/embed/"+match[2])
        } else {
        console("error")
        }
   }

  
  render() {
    return (
        <View>
    
          <Form >
            <Item stackedLabel>
                <Label>Enter Video Link</Label>
                <Input multiline={true} onChangeText={(text)=>{this.setState({url:text})}}/>
            </Item>
            
           

            <Item stackedLabel last >
              <Label>Header</Label>    
              <Input multiline={true} onChangeText={(text)=>this.caption_handler(text)}/>
            </Item>
          </Form>
         
       
         <NextButton 
          onPress={() =>this.postHandler()}
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
             
        </View>

    );
  }

}