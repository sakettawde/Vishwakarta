import React, { Component } from 'react';
import FeedCard2 from './FeedCard2';
import {  AsyncStorage, View ,FlatList,Button,ScrollView,RefreshControl,Alert,ActivityIndicator } from 'react-native';
import { Fab,Icon, Text } from 'native-base';
import {TempleFeed} from '../assets/ApiUrl';


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
      comment_count:0,
      refreshCount:0,
      loading:true

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
      this.templeFeedApi();
      
    //   let interval = 15000
    //   let refreshCount=0
    //   let startInterval = setInterval(() => {
    //   //console.log("start interval run..",this.state.refreshCount)
    //   if (refreshCount < 8) {
    //     this.templeFeedApi()
    //     //  this.setState({ refreshCount: this.state.refreshCount + 1 })
    //     refreshCount=refreshCount+1
    //   } else {
    //     clearInterval(startInterval)
    //   }
    // }, interval)


     } catch (error) {
       console.log(error)
     }
  }
  templeFeedApi = () => {
    console.log("In templeFeedApi")
    this.setState({loading:true})
    fetch(TempleFeed, {
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
        //console.log("templefeedApi Response", data)

        if (data.message == "Get The data") {
          console.log("Success")
          // console.log(data.imageData)
          // console.log(data.imageData.filter((image)=>{return image.feedCount==="10" ;}))
          data.records=data.records.slice(-20)
          data.records.map(item=>{
            item.image=data.imageData.filter((image)=>{return image.feedCount==item.id ;})
          })
          //console.log(data.records)

          this.setState({records:data.records.reverse(),flag:true,loading:false})
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
    this.templeFeedApi();

    this.setState({refreshing: false});
  }
  render(){
    return(
      
      <View style={{flex:1}}>
                    {this.state.loading && <ActivityIndicator size="large" />}

    
      {/* <ScrollView style={{paddingVertical: 10}}
          pinchGestureEnabled={true}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>}>
        

        { this.state.flag && 
        (this.state.records.map((item,index)=>
            
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
             tab="temple"
             key={index}
        /> 
        ))
        }
        </ScrollView> */}
       { this.state.flag &&
         <FlatList style={{paddingVertical: 10}}
         refreshControl={<RefreshControl refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}/>}
          ItemSeparatorComponent={() => { return (<View style={{height:1}}/>)}}
          keyExtractor={(item)=>{
            return item.id;
          }}              
          data={this.state.records}
          renderItem={({item})=>
                 
                 <FeedCard2 {...this.props} 
                 name={item.name} 
                 avatar={item.avatar}
                 date={item.date} 
                 caption={item.status}
                 array={item.image}
                 likes={item.likeCount}
                 comments={item.commentCount}
                 feed_id={item.id}
                 user_id={this.state.user_id}
                 tab="temple"
          />            
            }         
          />}
      
     {!this.state.loading && <View style={{flex:0}}>
      <Fab
              active={true}
              //direction="up"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomRight"
              onPress={() => this.props.navigation.navigate('Newpost',{
                tab:"temple"
              })}>
              <Icon name="md-add"/>
            </Fab>
          </View>
}

      
      </View>
      
    );
  }
}