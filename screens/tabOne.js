import React, { Component } from 'react';
import FeedCard2 from './FeedCard2';
import { StatusBar, AsyncStorage, View ,Button,ScrollView,RefreshControl } from 'react-native';
import { Fab,Icon } from 'native-base';
import {AdminFeed} from '../assets/ApiUrl';


export default class tabOne extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      records:{},
      flag:false,
      user_id:""
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
        console.log("AdminfeedApi Response", data)

        if (data.message == "text message.") {
          console.log("Success")
          this.setState({records:data.records,flag:true})
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
             <FeedCard2 {...this.props} 
             name={item.name} 
             avatar='https://facebook.github.io/react/logo-og.png'
             date={item.date} 
             caption={item.status}
             array={['https://wallpaper-house.com/data/out/2/wallpaper2you_20995.jpg','https://wallpaper-house.com/data/out/2/wallpaper2you_20996.jpg']}
             likes={200}
             comments={250}
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