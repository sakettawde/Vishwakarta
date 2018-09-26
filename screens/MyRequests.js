import React, { Component } from 'react';
import MentorCard from './MentorCard';
import {  AsyncStorage, View ,Button,ScrollView,RefreshControl,Alert } from 'react-native';
import { Fab,Icon, Text } from 'native-base';
import {ViewRequest} from '../assets/ApiUrl';


export default class MyRequests extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      list:{},
      flag:false,
      user_id:"",
     
    };
  }
  componentDidMount(){
    this._retrieveData()
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      await this.setState({user_id:value})
      this.ViewRequestApi(value)
      console.log("id ",value)
    
     } catch (error) {
       console.log(error)
     }
  }
  ViewRequestApi = (value) => {
    console.log("In viewRequest")
    this.setState({loading:true})
    fetch(ViewRequest, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          sid:value
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("MyfeedApi Response", data)

        if (data.message == "request") {
          console.log("Success")
          
          this.setState({list:data.records,loading:false})
        } else if (data.message) {
          Alert.alert(data.message)
        }
      }).catch((error)=>{
    console.log("Api call error");
    console.log(error.message);
 });
}  


  _onRefresh = () => {
    this.setState({refreshing: true});
    this.ViewRequestApi()

    this.setState({refreshing: false});
  }
  render(){
    return(
      
      <View style={{flex:1}}>
    
      <ScrollView style={{paddingVertical: 10}}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>}>
        {this.state.list && this.state.list.length>0?
        
        this.state.list.map((item,index)=>{
          return(
            <MentorCard 
            status={item.status}
            action={item.action}
            time={item.time}
            date={item.date}
            key={index}
            name={item.name}
            prof={item.professional}
            avatar={item.avatar}
            isMentor={false}
            />
         )
        }):(
          <View><Text style={{textAlign:'center'}}>Your requests will appear here</Text></View>
        )}
         
  
       
        
        </ScrollView>
      </View>
      
      
    );
  }
}