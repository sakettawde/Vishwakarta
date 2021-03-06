import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { base } from '../utils/base';
import { AsyncStorage,View,KeyboardAvoidingView } from "react-native";
import moment from 'moment'; 
import {AddChat} from '../assets/ApiUrl';


console.disableYellowBox = true;

export default class ChatPage extends React.Component {
  // static navigationOptions = {
  //   title:this.props.navigation.getParam('user_name'),  
  // };
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.getParam('user_name')) || 'Chat!',
  });
    state = {
      messages: [ ],
      convId: "",
      user_sender:"",
      sender_name:"",
      user_recv:"",
      recv_name:""
    }

    _retrieveData = async () => {
      try {
        //console.log('hi')
        this.state.user_recv=this.props.navigation.getParam('user_id')
        this.state.recv_name=this.props.navigation.getParam('user_name')
        const value = await AsyncStorage.getItem('user_id');
        const value2=await AsyncStorage.getItem('user_name');
        this.setState({user_sender:value,sender_name:value2})
        console.log("id ",value)
        console.log("name ",value2)
        await this._setConvId()
        this.listen()
       } catch (error) {
         console.log(error)
       }
    }
    AddChatApi = () => {
      console.log("In AddChatApi")
      fetch(AddChat, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user1:this.state.user_sender,
          user2:this.state.user_recv
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("AdminfeedApi Response", data)
  
          if (data.message == "Chat Added") {
            console.log("Success")
          
          } else if (data.message) {
          
            Alert.alert(data.message)
          }
        }).catch((error)=>{
      console.log("Api call error");
      console.log(error.message);
   });
  }

    _setConvId=()=>{
      let a=this.state.user_sender
      let b=this.state.user_recv
      console.log("Getiing ConvId")
      if(a<b){
        console.log(a+"TO"+b)
        this.setState({convId:a+"TO"+b})
      }
      else{
        console.log(b+"TO"+a)
        this.setState({convId:b+"TO"+a})

      }
    }

    componentDidMount(){
      this._retrieveData()
             
    }


    listen = () => {
        base.listenTo(`conversations/${this.state.convId}`, {
            context: this,
            asArray: true,
            queries: {
                orderByChild: 'timestamp',
                limitToFirst: 20
              },
            then(chatData){
              if(chatData.length == 0){
                console.log("Calling AddChatApi Here")
                this.AddChatApi()
              }
              const toReturn = chatData.map(item=>{
                let newItem = item
                newItem.createdAt = moment(item.timestamp).toDate()  
                return newItem
              })
                this.addMessages(toReturn)
            }
          })
    }
  
    onSend(messages = []) {
        //console.log(messages[0])
        newId = messages[0]._id
        let obj = messages[0]
        obj.timestamp = moment().format()
        //console.log(obj)
        base.post(`conversations/${this.state.convId}/${newId}`, {
            data: obj,
            then(err){
              if(!err){
                console.log("success")
              }
            }
          })
    }

    compare(prop) {  
      return function(a, b) {  
          if (a[prop] > b[prop]) {  
              return -1;  
          } else if (a[prop] < b[prop]) {  
              return 1;  
          }  
          return 0;  
      }  
  }  

    addMessages = (messages=[]) => {
        // this.setState(previousState => ({
        //     messages: GiftedChat.append(previousState.messages, messages),
        //   }))
        let previousm = this.state.messages
        let newm = messages

        let prevKeys = previousm.map(item=>item.key)
        let latestm = newm.filter(item=>{
            return !(prevKeys.indexOf(item.key) > -1)
        })
        let newlatestm = latestm.sort(this.compare("timestamp"))
        this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, newlatestm)
              }))
    }
  
    render() {
      
      //console.log("Date testing")
     // console.log(moment.format())
      // console.log(this.state)
      // console.log(now.getMonth())
      // console.log(now.getDate())
      // console.log(now.getHours())
      // console.log(now.getMinutes())
      // console.log(now.getSeconds())

      return (
        <View style={{flex:1}}>
        <GiftedChat
          messages={this.state.messages}
          // forceGetKeyboardHeight={true}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.state.user_sender,
            name: this.state.sender_name
          }}
        />
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80}/>
       
        </View>
      )
    }
  }