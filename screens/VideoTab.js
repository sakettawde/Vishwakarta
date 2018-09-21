import React, { Component } from 'react';
import Video from './VideoCard';
import { StatusBar, AsyncStorage, View ,Button,ScrollView,RefreshControl,Alert } from 'react-native';
import { Fab,Icon, Text } from 'native-base';
import {ViewVideo} from '../assets/ApiUrl';
import VideoCard from './VideoCard';


export default class VideoTab extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
     item:{ }
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
      
      this.VideoFeedApi()
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
  VideoFeedApi = () => {
    console.log("In VideoFeedApi")
    this.setState({loading:true})
    fetch(ViewVideo, {
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

        if (data.message == "video view") {
          console.log("Success")
         
          this.setState({item:data.records.reverse(),flag:true})
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
    this.VideoFeedApi();

    this.setState({refreshing: false});
  }
  render(){
    return(
      
      <View style={{flex:1}}>
    
      <ScrollView style={{paddingVertical: 10}}
          pinchGestureEnabled={true}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>}>
        
        { this.state.flag && 
        (this.state.item.map((item,index)=>
            
             <VideoCard  
              header={item.status}
              link={item.link }
             key={index}
              /> 
        ))
        }
          {/* <VideoCard  header={this.state.item.header} link={this.state.item.VideoUrl}/>
          <VideoCard header={this.state.item.header} link={this.state.item.VideoUrl}/>
          <VideoCard header={this.state.item.header} link={this.state.item.VideoUrl}/> */}

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