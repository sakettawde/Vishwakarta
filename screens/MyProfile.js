import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,Alert
} from 'react-native';
import {Text , Label , Left ,Right ,Container, Header, Content, List, ListItem,Title, Input, Button } from 'native-base';
import { Userinfo } from "../assets/ApiUrl";


export default class ProfileSettings extends React.Component {
  constructor(){
    super();
    this.state = {
      value:  false,
      records:[{}]

    }
} 
componentDidMount(){
  const info=this.props.navigation.getParam('records')
  this.state.user_id=info["user_id"]
  console.log(this.state.user_id)

  this.UserInfoApi()
  //console.log(this.state.records)
  this.forceUpdate()

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
        this.state.records=data.records
        console.log(this.state.records)
        //console.log(data.records)                  
        console.log(this.state.records[0].name)
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

handleClick(e){

  this.setState({value:!this.state.value})
   }

  render() {
    
    return (
      <Container >
        <Header />
        <Content>
          <Image source={{uri:"https://res.cloudinary.com/jerrick/image/upload/f_auto,fl_progressive,q_auto,c_fit,w_1100/t3onxzmjhmfbbah9ahzi" }} 
          style={{height: 200, alignSelf: "stretch", flex: 1}}/>
          <Text>Info</Text>
          <List>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Name</Text>
            </Left>
              <Input placeholder={this.state.records[0].name} editable={this.state.value}/>
            </ListItem>

             <ListItem>
            <Left style={{flex:1}}>
              <Text>Contact</Text>
            </Left>
              <Input placeholder={this.state.records[0].mobile_no} editable={this.state.value}/>
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
        <View style={{flexDirection:'row'}}>
         <Left></Left>
          <Button onPress={this.handleClick.bind(this)}><Text>Edit</Text></Button>
          <Button onPress={this.handleClick.bind(this)} editable={this.state.value} >
              <Text>Save</Text>
            </Button>
       </View>

          
 
        </Content>
      </Container>
    )
  }
}
