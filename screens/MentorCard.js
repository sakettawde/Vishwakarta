import React, { Component } from 'react';
import { Image ,Dimensions ,View,StyleSheet} from 'react-native';
import { CardItem, Thumbnail, Text, Button, Left, Right , Body  } from 'native-base';
import styled from "styled-components";
import {AddLike,UnLike,AddTempleLike,UnTempleLike,AddMyLike,UnMyLike} from '../assets/ApiUrl';
import { FlexColumn } from './VideoCard';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicon from 'react-native-vector-icons/Octicons';


export default class MentorCard extends Component {

    state={
      like:false,
      like_count:0,
      comments_count:0,
      image_array:{},
      tab:"",
      feedId:""
    }

  
    componentDidMount(){
    }

//   unLikeApi = (link) => {
//     console.log("In unLikeApi")
//     this.setState({loading:true})
//     fetch(link, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         feedId:this.props.feed_id,
//         userId:this.props.user_id,
//         likeCount:parseInt(this.state.like_count)-1
//       })
//     })
//       .then(data => {
//         return data.json()
//       })
//       .then(data => {
//         console.log("UnLike Response", data)

//         if (data.message == "UnLiked") {
//           console.log("Success")
//           //this.setState({like_count:data.likeCount})
//           //console.log("Count ",data.likeCount)
          
//         } else if (data.message) {
//           Alert.alert(data.message)
//         }
//       }).catch((error)=>{
//     console.log("Api call error");
//     console.log(error.message);
//  });
// }  


    
  render() {
    return (
        <View>
        
          <Card style={{backgroundColor:'#00AA8A'}}>
            <CardItem >
              <Left>
                <Thumbnail source={{uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-f86ca6f98affc4bfe9306d9693638920.png'}} />
                <Body>
                  <Text>Name</Text>
                  <Text note>Profession</Text>
                </Body>
              </Left>
              <Right>
                    <View style={{flexDirection: 'column',justifyContent:'center',alignItems: 'center',}}>
                    <Octicon size={30} name="verified" />
                    <Text note>Approved</Text>
                    </View>
              </Right>
            
              </CardItem>

            
            <FlexColumn style={{justifyContent:"center",alignItems: 'center',}}>  
            <NameText>
                   Date:- 1st Oct 2018
            </NameText>
            <NameText>
                   Time:- 8:00 pm
            </NameText>
            </FlexColumn>
            

            


            <CardItem>
               

            </CardItem>
          </Card>

           <Card style={{backgroundColor:'yellow'}}>
           <CardItem >
             <Left>
               <Thumbnail source={{uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-f86ca6f98affc4bfe9306d9693638920.png'}} />
               <Body>
                 <Text>Name</Text>
                 <Text note>Profession</Text>
               </Body>
             </Left>
             <Right>
                   <View style={{flexDirection: 'column',justifyContent:'center',alignItems: 'center',}}>
                   <MaterialIcon size={30} name="access-time" />
                   <Text note>Wating for Approval</Text>
                   </View>
             </Right>
           
             </CardItem>

           
           <FlexColumn style={{justifyContent:"center",alignItems: 'center',}}>  
           <NameText>
                  Date:- 1st Oct 2018
           </NameText>
           <NameText>
                  Time:- 8:00 pm
           </NameText>
           </FlexColumn>
           

           


           <CardItem>
               <View style={{flexDirection: 'row',}}>
           
                <Button transparent textStyle={{color: '#87838B'}} style={{borderWidth: 1,flex:1}}>
                 
                  <Text style={{textAlign:"center"}}>Cancel</Text>
                </Button>
                <View style={{flex:.1}}></View>
             

              
                <Button transparent textStyle={{color: '#87838B'}} style={{borderWidth: 1,flex:1}}>
                  <Text>Approve</Text>
                </Button>
                </View>
           </CardItem>
         </Card>

          <Card style={{backgroundColor:'#ff1a1a'}}>
          <CardItem >
            <Left>
              <Thumbnail source={{uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-f86ca6f98affc4bfe9306d9693638920.png'}} />
              <Body>
                <Text>Name</Text>
                <Text note>Profession</Text>
              </Body>
            </Left>
            <Right>
                  <View style={{flexDirection: 'column',justifyContent:'center',alignItems: 'center',}}>
                  <MaterialIcon size={30} name="cancel" />
                  <Text note>Cancelled</Text>
                  </View>
            </Right>
          
            </CardItem>

          
          <FlexColumn style={{justifyContent:"center",alignItems: 'center',}}>  
          <NameText>
                 Date:- 1st Oct 2018
          </NameText>
          <NameText>
                 Time:- 8:00 pm
          </NameText>
          </FlexColumn>
          

          


          <CardItem>
             

          </CardItem>
        </Card>

        </View>
    );
  }
}

const Card = styled.View`
elevation:4;
margin-top:14px;
margin-left:14px;
margin-right:14px;
border-radius: 8px;
  `

  const NameText=styled.Text`
  height: 22px;
  font-size: 17px;
  font-weight: 600;
  font-style: normal;
  color: rgba(3, 15, 41, 0.9);`