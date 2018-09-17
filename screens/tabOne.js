import React, { Component } from 'react';
import FeedCard2 from './FeedCard2';
import { StatusBar, AsyncStorage, View ,Button,ScrollView,RefreshControl,Alert } from 'react-native';
import { Fab,Icon, Text } from 'native-base';
import {AdminFeed} from '../assets/ApiUrl';


export default class tabOne extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      records:{},
      imageData:{},
      flag:false,
      user_id:"",
      like_count:0,
      comment_count:0
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
      this.AdminFeedApi();
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
          console.log(data.records)

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
    this.AdminFeedApi();

    this.setState({refreshing: false});
  }
  render(){
    return(
      
      <View style={{flex:1}}>
    
      <ScrollView style={{paddingVertical: 10}}
          pinchGestureEnabled={true}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>}>
          {/* {this.state.records.map((item,index)=>
            <FeedCard2 {...this.props}/>)} */}
        
        {/* <FeedCard2 {...this.props} 
          name="Name Prop" 
          avatar='https://facebook.github.io/react/logo-og.png'
          date="April 15, 2016" 
          caption=" This is Prop. Modal navigation drawers block interaction with the rest of an app’s content with a scrim.
          They are elevated above most of the app’s UI and don’t affect the screen’s layout grid."
          array={['https://wallpaper-house.com/data/out/2/wallpaper2you_20995.jpg','https://wallpaper-house.com/data/out/2/wallpaper2you_20996.jpg']}
          likes={200}
          comments={250}
          feed_id={25}
          /> */}

        { this.state.flag && 
        (this.state.records.reverse().map((item,index)=>
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
             key={index}
        /> 
        ))
        }
        </ScrollView>
      
      
      <View style={{flex:0}}>
      <Fab
              active={true}
              //direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.props.navigation.navigate('Newpost',{
                tab:"admin"
              })}>
              <Icon name="md-add"/>
            </Fab>
          </View>


      
      </View>
      
    );
  }
}