import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { base } from '../utils/base';
import { AsyncStorage } from "react-native"



export default class ChatPage extends React.Component {
    state = {
      messages: [
        {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
      ],
      convId: "101TO105",
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
                limitToLast: 20
              },
            then(chatData){
              //console.log(chatData)
              const toReturn = chatData.map(item=>{
                let newItem = item
                newItem.createdAt = item.timestamp  
                return newItem
              })
                this.addMessages(toReturn)
            }
          })
    }
  
    onSend(messages = []) {
        //console.log(messages)
        newId = messages[0]._id
        let obj = messages[0]
        obj.timestamp = new Date()
        base.post(`conversations/${this.state.convId}/${newId}`, {
            data: obj,
            then(err){
              if(!err){
                console.log("success")
              }
            }
          })
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
        this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, latestm)
              }))
    }
  
    render() {
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