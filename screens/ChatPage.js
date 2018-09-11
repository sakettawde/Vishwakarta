import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { base } from '../utils/base';
import { AsyncStorage } from "react-native";
import moment from 'moment'; 


export default class ChatPage extends React.Component {
    state = {
      messages: [
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: moment().format(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
      ],
      convId: "101TO106",
      user_sender:"",
      user_recv:""
    }

    _retrieveData = async () => {
      try {
        console.log('hi')
        const value = await AsyncStorage.getItem('user_id');
        console.log("val ",value)
       } catch (error) {
         console.log(error)
       }
    }

    componentDidMount(){

        this.listen()
        this._retrieveData()
        this.state.user_recv=this.props.navigation.getParam('user_id')  
      //this.state.user_sender=this.props.navigation.getParam('current_id')
        
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
             // console.log(chatData)
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
      let now = new Date()
      //console.log("Date testing")
     // console.log(moment.format())
      console.log(this.state)
      // console.log(now.getMonth())
      // console.log(now.getDate())
      // console.log(now.getHours())
      // console.log(now.getMinutes())
      // console.log(now.getSeconds())

      return (
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
            name: "Test User"
          }}
        />
      )
    }
  }