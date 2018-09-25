import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text ,
Content , List , ListItem , Left , Body , Right , Thumbnail, } from 'native-base';
import {Alert,ScrollView,View} from 'react-native';
import {NextButton,ButtonText,ScreenTitle,FlexColumn} from '../utils/styles';
import {NearMe } from "../assets/ApiUrl";
import styled from 'styled-components';
import { FlexRow } from '../utils/styles';
import {LinearGradient} from 'expo';


export default class Mentor extends Component {
  
  constructor(){
     super();
     this.state ={
      list:{},
      }
    }

    componentDidMount(){
    }
    
    
  
      
    NearMeApi = (value) =>{
      console.log("NearMeApi")
      
      
      fetch(NearMe, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          cpincode: value
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("UserList Response", data)
          if(data.message=="Data available"){
            this.setState({list:data.records})
          //  console.log("data ",data)
            
          }
          else {
            Alert.alert(data)
          }    
        })
        .catch((error)=>{
          console.log("Api call error");
          console.log(error.message);
       });
    
      }

    




// UserListApi = () =>{
//   console.log("In UserListApi")
//   fetch(UserList, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ })
//   })
//     .then(data => {
//       return data.json()
//     })
//     .then(data => {
//       //console.log("UserList Response", data)
//       if(data.message=="text message."){
//         this.setState({list:data.records})
        
//       }
//       else {
//         Alert.alert(data)
//       }    
//     })
//     .catch((error)=>{
//       console.log("Api call error");
//       console.log(error.message);
//    });

//   }


  

  render() {

   
    
      return (
        <FlexColumn style={{flex:1}}>
          <View style={{flex:1}}>
          <ScrollView >
            <List>
                    {/* {this.state.list && this.state.list.length > 0 &&
                    this.state.list.map((item,index)=>{
                      return this.state.user_id!=item.user_id?
                        <ListItem key={index} avatar 
                        onPress={()=>{ this.props.navigation.navigate('UserProfile',{
                          user_id:item.user_id,
                         // current_id:this.state.user_id
                      })
                      }} >
                        <Left>
                            <Thumbnail source={{ uri:item.avatar  }} />
                        </Left>
                        <Body >
                            <Text>{item.name}</Text>
                            <Text note>{item.professional}</Text>
                            <Text note>{item.mobile_no}</Text>
                        </Body>
                    </ListItem>
                    :<View/>
                    })} */}

             <ListItem avatar >
                        <Left>
                            <Thumbnail source={{ uri:'http://www.myiconfinder.com/uploads/iconsets/256-256-f86ca6f98affc4bfe9306d9693638920.png'}} />
                        </Left>
                        <Body >
                            <Text>Firstname Lastname</Text>
                            <Text note>Profession</Text>
                            <Text note>8888888888</Text>
                            <FlexRow style={{justifyContent: 'space-around',marginTop:5}}>
                            
                            <SaveButton onPress={()=>{this.props.navigation.navigate('MentorTime',{
                                info:"call"
                            })}}><SaveText>Call</SaveText></SaveButton>
                            <SaveButton onPress={()=>{this.props.navigation.navigate('MentorTime',{
                                info:"visit"
                            })}}>
                            <SaveText>Visit</SaveText></SaveButton>
                            <View></View>
                            </FlexRow>
                        </Body>
                        {/* <Right>
                            <SaveButton onPress={()=>{this.props.navigation.navigate('MentorTime')}}><SaveText>Call</SaveText></SaveButton>
                            <SaveButton onPress={()=>{this.props.navigation.navigate('MentorTime')}}
                            style={{marginTop: 3,}}><SaveText>Visit</SaveText></SaveButton>
                        </Right> */}
                    </ListItem>
                                    
              
            </List>
            </ScrollView>
            </View>
            <View>

            <NextButton 
            
            style={{position: 'absolute',                                          
            bottom: 0,alignSelf: 'center',marginBottom: 10, }} 
             
            >
            <LinearGradient
                  colors={["#3F51B5", "#3F51B6"]}
                  start={{ x: 0.0, y: 1.0 }}
                  end={{ x: 1.0, y: 0.0 }}
                  style={{ width: "100%", height: "100%",borderRadius:10,paddingLeft: 5,paddingRight: 5,}}
                >
  
              <ButtonText>Offer Mentorship</ButtonText>
            </LinearGradient>
          </NextButton>
          </View>
        </FlexColumn>
        
      );
  
    
       
     
    }
    
  
}   


const SaveButton=styled.TouchableOpacity`   
width: 90px;
  height: 30px;
  border-radius: 25px;
  border: solid 1px #030f29;
  justify-content:center;
  align-items:center;
  elevation:-3;
  `

  const SaveText=styled.Text`
 
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  color: #030f29;`  

  