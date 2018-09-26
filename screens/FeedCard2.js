import React, { Component } from 'react';
import { Image ,Dimensions ,View,StyleSheet} from 'react-native';
import { CardItem, Thumbnail, Text, Button, Left, Right , Body ,Icon } from 'native-base';
import Swiper from 'react-native-swiper';
import styled from "styled-components";
import {AddLike,UnLike,AddTempleLike,UnTempleLike,AddMyLike,UnMyLike} from '../assets/ApiUrl';

export default class FeedCard2 extends Component {

    state={
      like:false,
      like_count:0,
      comments_count:0,
      image_array:{},
      tab:"",
      feedId:""
    }

  
    componentDidMount(){
      this.setState({like_count:this.props.likes,
        comments_count:this.props.comments,
        image_array:this.props.array,
        tab:this.props.tab,feedId:this.props.feed_id})
      
    }

    addLikeApi = (link) => {
      console.log("In AddLikeApi")
      // console.log()
      this.setState({loading:true})
      fetch(link, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          feedId:this.props.feed_id,
          userId:this.props.user_id,
          likeCount:this.state.like_count
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          console.log("AddLike Response", data)
  
          if (data.message == "Liked") {
            console.log("Success")
            //this.setState({like_count:data.likeCount})
            //console.log("Count ",data.likeCount)

            
          } else if (data.message) {
            Alert.alert(data.message)
          }
        }).catch((error)=>{
      console.log("Api call error");
      console.log(error.message);
   });
  }

  unLikeApi = (link) => {
    console.log("In unLikeApi")
    this.setState({loading:true})
    fetch(link, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        feedId:this.props.feed_id,
        userId:this.props.user_id,
        likeCount:this.state.like_count
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("UnLike Response", data)

        if (data.message == "UnLiked") {
          console.log("Success")
          //this.setState({like_count:data.likeCount})
          //console.log("Count ",data.likeCount)
          
        } else if (data.message) {
          Alert.alert(data.message)
        }
      }).catch((error)=>{
    console.log("Api call error");
    console.log(error.message);
 });
}  


  toggleLike=async()=>{
    if(this.state.like){
      await this.setState({like_count:parseInt(this.state.like_count)-1,like:!this.state.like})
      console.log("unlike")
      if(this.state.tab=='admin'){
        console.log("admin")
       this.unLikeApi(UnLike)
      }
      else if(this.state.tab=='temple'){
        console.log("temple")
        this.unLikeApi(UnTempleLike)
      }
      else if(this.state.tab=='my'){
        console.log("my")
        this.unLikeApi(UnMyLike)
      }
    }
    else{
      await this.setState({like_count:parseInt(this.state.like_count)+1,like:!this.state.like})
      if(this.state.tab=='admin'){
        console.log("admin")
        this.addLikeApi(AddLike)
        }
        else if(this.state.tab=='temple'){
          console.log("temple")
          this.addLikeApi(AddTempleLike)
        }
        else if(this.state.tab=='my'){
          console.log("my")
          this.addLikeApi(AddMyLike)
  
        }
      console.log("like")
    }
    
  }
    
  render() {
    return (
        
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: this.props.avatar}} />
                <Body>
                  <Text>{this.props.name}</Text>
                  <Text note>{this.props.date}</Text>
                </Body>
              </Left>
            
              </CardItem>

            
              
              {this.props.array[0] && (

              <Swiper style={{height:200, width:Dimensions.get('window').width}} loop={false} >
                 
                {this.props.array.map((item,index)=>
                  <View style={styles.slide} key={index}>
                  <Image source={{uri: item.link}} 
                  style={{flex:1 ,height: 200, width: Dimensions.get('window').width}}/>
                </View>
                  )

                }

                
              </Swiper>
              ) }
                  
                <Text style={{padding:8,fontSize: 14, opacity: 0.9, color: "#212121"}}>
                  {this.props.caption}
                </Text>
              
            


            <CardItem>  
              <Left>
                <Button transparent textStyle={{color: '#87838B'}} 
                onPress={()=>this.toggleLike()}>

                {this.state.like?(<Icon name="ios-heart" />):
                (<Icon name="ios-heart-outline" />)}
                  
                  <Text>{this.state.like_count} Likes</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent textStyle={{color: '#87838B'}}
                onPress={()=>{this.props.navigation.navigate('Comments',{
                  tab:this.props.tab,
                  feedId:this.props.feed_id,
                  userid:this.props.user_id
                })}}>
                  <Icon name="md-chatboxes" />
                  <Text>{this.props.comments} Comments</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
    );
  }
}

const Card = styled.View`
elevation:4;
margin-top:14px;
margin-left:14px;
margin-right:14px;
border-radius: 8px;
  background-color: #ffffff;`

const styles = StyleSheet.create({
  wrapper: {
    height: 200, 
    width: Dimensions.get('window').width,
    

  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:200
    
  }
})