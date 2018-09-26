import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text ,
Content , List , ListItem , Left , Body , Right , Thumbnail,Toast } from 'native-base';
import {Alert,ScrollView,View,ActivityIndicator} from 'react-native';
import {ViewMentor } from "../assets/ApiUrl";
import styled from 'styled-components';
import { FlexRow } from '../utils/styles';
import {LinearGradient} from 'expo';


export default class Mentor extends Component {
  
  constructor(){
     super();
     this.state ={
      list:{},
      flag:false
      }
    }

    componentDidMount(){
      this.viewMentorApi()
    }
    
    
  
      
    viewMentorApi = (value) =>{
      console.log("ViewMentorApi")
      
      
      fetch(ViewMentor, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({      })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("UserList Response", data)
          if(data.message=="mentors"){
            this.setState({list:data.records,flag:true})
            //console.log(data.records)
            console.log("data set")
            
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

    

showToast=()=>{
  Toast.show({
    text: "Request Sent",
    buttonText: "Okay",
    duration: 2000
  })
}


  

  render() {

   
    
      return (
        <Container>
          <Content>
  
          <ScrollView >
            <List>
            
              {this.state.list && this.state.list.length > 0 ? 
              this.state.list.map((item,index)=>{

                return(
                <ListItem avatar key={index}>
                <Left>
                    <Thumbnail source={{ uri:item.avatar}} />
                </Left>
                <Body >
                    <Text>{item.name}</Text>
                    <Text note>{item.professional}</Text>
                    <Text note>{item.mobile_no}</Text>
                    <FlexRow style={{justifyContent: 'space-around',marginTop:5}}>
                    
                    <SaveButton onPress={()=>{this.props.navigation.navigate('MentorTime',{
                        info:"call",
                        mid:item.user_id,
                        toast:this.showToast
                    })}}><SaveText>Call</SaveText></SaveButton>
                    <SaveButton onPress={()=>{this.props.navigation.navigate('MentorTime',{
                        info:"visit",
                        mid:item.user_id,
                        toast:this.showToast
                    })}}>
                    <SaveText>Visit</SaveText></SaveButton>
                    <View></View>
                    </FlexRow>
                </Body>
              </ListItem>)
              }):(<View style={{flexDirection:'column'}}>
              <Text>Searching Mentor...</Text>
              <ActivityIndicator size='large'/>
              </View>)}
                           
                                    
              
            </List>
            </ScrollView>

       
       
          </Content>
          </Container>
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

  