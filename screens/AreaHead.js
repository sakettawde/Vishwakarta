import React from 'react';
import {
  ScrollView,
  View,
  Image,Alert
} from 'react-native';
import {Text , Label , Left ,Right ,Container, Header, Content, List, ListItem,Title, Input, Button } from 'native-base';
import { Userinfo } from "../assets/ApiUrl";
import styled from 'styled-components';

export default class UserProfile extends React.Component {
  constructor(){
    super();
    this.state = {
      user_id:1,      
      records:[{}],
      value:false

    }
} 
componentDidMount(){
  this.UserInfoApi()
}

UserInfoApi = () =>{
  console.log("In UserInfoApi")
  fetch(Userinfo, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id:this.state.user_id
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
      <Container >
        {/* <Header /> */}
        <Content>
            <Image source={{uri:this.state.records[0].avatar }} 
          style={{marginTop:15,height:80,width:80 ,borderRadius:40,alignSelf:"center"}}/>
         
         
         
          <Button onPress={()=>{
            this.props.navigation.navigate('ChatPage',{
              user_id:this.state.user_id,
              user_name:this.state.records[0].name
            })}
          }><Text>Chat</Text></Button>



          <Text>Info</Text>
          <List>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Name</Text>
            </Left>
              <Input placeholder={this.state.records[0].name} editable={this.state.value} 
                    onChangeText={(text)=>{this.setState({name : text})}}/>
            </ListItem>

             <ListItem>
            <Left style={{flex:1}}>
              <Text>Contact</Text>
            </Left>
              <Input placeholder={this.state.records[0].mobile_no} editable={this.state.value}
                      onChangeText={(text)=>{this.setState({mobile_num : text})}}/>
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>BirthDate</Text>
            </Left>
              <Input placeholder={this.state.records[0].dob} editable={this.state.value}/>
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Profession</Text>
            </Left>
              <Input placeholder={this.state.records[0].professional} editable={this.state.value}/>
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Gotra</Text>
            </Left>
              <Input placeholder={this.state.records[0].gotra} editable={this.state.value}/>
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Current Pincode</Text>
            </Left>
              <Input placeholder={this.state.records[0].current_pincode} editable={this.state.value}/>
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Home Pincode</Text>
            </Left>
              <Input placeholder={this.state.records[0].home_pincode} editable={this.state.value}/>
            </ListItem> 
           
          </List>


        <CustomText style={{marginTop: 10,marginBottom: 10,alignSelf: 'center',}}>
        Do you wanna be Area Head?</CustomText>
          
          
 
        </Content>
      </Container>
    )
  }
}

const CustomText=styled.Text`
height: 22px;
font-size: 17px;
font-weight: 600;
font-style: normal;
color: rgba(3, 15, 41, 0.9);`