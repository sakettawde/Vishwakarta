import React, { Component } from 'react';
import Video from './VideoCard';
import { StatusBar, AsyncStorage, View ,Button,ScrollView,RefreshControl,Alert } from 'react-native';
import { Fab,Icon, Text } from 'native-base';
import {AdminFeed} from '../assets/ApiUrl';
import VideoCard from './VideoCard';


export default class VideoTab extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
     item:{
       header:"Listen to this Song!",
       VideoUrl:"https://www.youtube.com/embed/Y4fodpIwal8"
     }
    };
  }
  componentDidMount(){
    this._retrieveData()
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      await this.setState({user_id:value})
      console.log("id ",value)
      
      
    //   let interval = 15000
    //   let startInterval = setInterval(() => {
    //   //console.log("start interval run..",this.state.refreshCount)
    //   if (this.state.refreshCount < 12) {
      
    //     this.setState({ refreshCount: this.state.refreshCount + 1 })
    //   } else {
    //     clearInterval(startInterval)
    //   }
    // }, interval)


     } catch (error) {
       console.log(error)
     }
  }
  AdminFeedApi = () => {
    console.log("In AdminFeedApi")
    this.setState({loading:true})
    fetch(AdminFeed, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("AdminfeedApi Response", data)

        if (data.message == "Get The data") {
          console.log("Success")
          // console.log(data.imageData)
          // console.log(data.imageData.filter((image)=>{return image.feedCount==="10" ;}))
          data.records.map(item=>{
            item.image=data.imageData.filter((image)=>{return image.feedCount==item.id ;})
          })
          //console.log(data.records)

          this.setState({records:data.records,like_count:data.loveCount,comment_count:data.commentNo,flag:true})
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
    //this.AdminFeedApi();

    this.setState({refreshing: false});
  }
  render(){
    return(
      
      <View style={{flex:1}}>
    
      <ScrollView style={{paddingVertical: 10}}
          pinchGestureEnabled={true}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>}>
        
        {/* { this.state.flag && 
        (this.state.records.reverse().map((item,index)=>
            
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
             tab="admin"
             key={index}
        /> 
        ))
        } */}
          <VideoCard  header={this.state.item.header} link={this.state.item.VideoUrl}/>
          <VideoCard header={this.state.item.header} link={this.state.item.VideoUrl}/>
          <VideoCard header={this.state.item.header} link={this.state.item.VideoUrl}/>

        </ScrollView>
      
      
      <View style={{flex:0}}>
      <Fab
              active={true}
              //direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.props.navigation.navigate('NewVideo',{
                user_id:this.state.user_id
              })}>
              <Icon name="md-add"/>
            </Fab>
          </View>


      
      </View>
      
    );
  }
}