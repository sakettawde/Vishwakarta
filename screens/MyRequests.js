import React, { Component } from 'react';
import MentorCard from './MentorCard';
import {  AsyncStorage, View ,Button,ScrollView,RefreshControl,Alert } from 'react-native';
import { Fab,Icon, Text } from 'native-base';
import {MyFeed} from '../assets/ApiUrl';


export default class MyRequests extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      records:{},
      flag:false,
      user_id:"",
     
    };
  }
  componentDidMount(){
    //this._retrieveData()
  }
//   _retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('user_id');
//       await this.setState({user_id:value})
//       console.log("id ",value)
    
//      } catch (error) {
//        console.log(error)
//      }
//   }
//   MyFeedApi = () => {
//     console.log("In MyFeedApi")
//     this.setState({loading:true})
//     fetch(MyFeed, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({})
//     })
//       .then(data => {
//         return data.json()
//       })
//       .then(data => {
//         //console.log("MyfeedApi Response", data)

//         if (data.message == "Get The data") {
//           console.log("Success")
//           // console.log(data.imageData)
//           // console.log(data.imageData.filter((image)=>{return image.feedCount==="10" ;}))
//           data.records.map(item=>{
//             item.image=data.imageData.filter((image)=>{return image.feedCount==item.id ;})
//           })
//           console.log(data.records)

//           this.setState({records:data.records.reverse(),like_count:data.loveCount,comment_count:data.commentNo,flag:true})
//         } else if (data.message) {
//           Alert.alert(data.message)
//         }
//       }).catch((error)=>{
//     console.log("Api call error");
//     console.log(error.message);
//  });
// }


  _onRefresh = () => {
    this.setState({refreshing: true});

    this.setState({refreshing: false});
  }
  render(){
    return(
      
      <View style={{flex:1}}>
    
      <ScrollView style={{paddingVertical: 10}}
          pinchGestureEnabled={true}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>}>
         
         <MentorCard {...this.props}/>
       

        {/* { this.state.flag && 
        (this.state.records.map((item,index)=>
              // { let id=item.id
              //   console.log(this.state.imageData.filter((image)=>{
              //     console.log("feed",image.feedCount)
              //     console.log("id",id)
              //     return image.feedCount==item.id ;}));}
             <FeedCard2 {...this.props} 
             name={item.name} 
             avatar={item.avatar}
             date={item.date} 
             caption={item.status}
             array={item.image}
             likes={this.state.like_count}
             comments={this.state.comment_count}
             feed_id={item.id}
             user_id={this.state.user_id}
             tab="my"
             key={index}
        /> 
        ))
        } */}
        
        </ScrollView>
      </View>
      
      
    );
  }
}