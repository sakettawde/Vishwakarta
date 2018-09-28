import React from 'react';
import {
  ScrollView,
  View,
  Image,Alert
} from 'react-native';
import {Text , Label , Left ,Right ,Container, Header, 
  Content, List, ListItem,Title, Input, Button,StyleProvider } from 'native-base';
import { Userinfo } from "../assets/ApiUrl";
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import styled from 'styled-components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';



export default class UserProfile extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.getParam('user_name')) ,
  });
  constructor(){
    super();
    this.state = {
      user_id:"",      
      records:[{}],
      value:false

    }
} 
componentDidMount(){
  const temp=this.props.navigation.getParam('user_id')  
    console.log(temp)
  this.setState({user_id:temp})
  this.UserInfoApi(temp)
}

UserInfoApi = (val) =>{
  console.log("In UserInfoApi")
  fetch(Userinfo, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id:val
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log("UserInfo Response", data)
      if(data.message=="Data available"){
        this.setState({records:data.records})
        //console.log(this.state.records)
        //console.log(data.records)                  
        //console.log(this.state.records[0].name)
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


  render() {
    
    return (
      <StyleProvider style={getTheme(material)}>

      <Container >
        {/* <Header /> */}
        <Content style={ { zIndex: 0 }}>
          <Image source={{uri:this.state.records[0].avatar }} 
          style={{marginTop:15,height:80,width:80 ,borderRadius:40,alignSelf:"center",
                elevation:8}}/>
         
         
         
         


          <CardView>
            
            <BoxView style={{marginTop:12}}>
              <TagText>Name</TagText>
              <ValueText>{this.state.records[0].name}</ValueText>
            </BoxView>

            <BoxView style={{marginTop:12}}>
              <TagText>Contact</TagText>
              <ValueText>{this.state.records[0].mobile_no}</ValueText>
            </BoxView>

            <BoxView style={{marginTop:12}}>
              <TagText>BirthDate</TagText>
              <ValueText>{this.state.records[0].dob}</ValueText>
            </BoxView>

            <BoxView style={{marginTop:12}}>
              <TagText>Profession</TagText>
              <ValueText>{this.state.records[0].professional}</ValueText>
            </BoxView>

            <BoxView style={{marginTop:12}}>
              <TagText>Gotra</TagText>
              <ValueText>{this.state.records[0].gotra}</ValueText>
            </BoxView>

            <BoxView style={{marginTop:12}}>
              <TagText>Current Pincode</TagText>
              <ValueText>{this.state.records[0].current_pincode}</ValueText>
            </BoxView>

            <BoxView style={{marginTop:12}}>
              <TagText>Home Pincode</TagText>
              <ValueText>{this.state.records[0].home_pincode}</ValueText>
            </BoxView>         
            

          </CardView>
          

         {/* <Button onPress={()=>{
            this.props.navigation.navigate('ChatPage',{
              user_id:this.state.user_id,
              user_name:this.state.records[0].name
            })}
          }><Text>Chat</Text></Button> */}

          <Button icon large rounded light style={{elevation:6,marginTop:-40,alignSelf:"flex-end",
                padding:2,marginRight:20}}
                onPress={()=>{
                  this.props.navigation.navigate('ChatPage',{
                    user_id:this.state.user_id,
                    user_name:this.state.records[0].name
                  })}}
                  >
          <MaterialIcon size={50} name="message-text-outline" />
          </Button>


          
 
        </Content>
      </Container></StyleProvider>
    )
  }
}
const BoxView = styled.View`
    border-radius: 10px;
    width:90%;
    background-color: #F0F0F0;
    padding: 20px;
    align-self:center;
    flex-direction:row;
  
  `

  const TagText = styled.Text`
  font-size: 18px;
  font-weight: 100;
  text-align: center;
  color:  #101010;
  flex:1;
`
const ValueText = styled.Text`
  font-size: 18px;
  font-weight: 100;
  text-align: center;
  color:  #101010;
  flex:2;
`
const CardView=styled.View`
display:flex;
flexDirection:column;
margin-bottom:10px;
elevation:4;
background-color: #F8F8F8;
margin-left:14px;
margin-right:14px;
margin-top:-40px;
padding-top:40px;
padding-bottom:10px;
`