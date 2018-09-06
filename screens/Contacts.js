import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text ,
Content , List , ListItem , Left , Body , Right , Thumbnail, Picker } from 'native-base';
import {Switch ,Alert,ScrollView} from 'react-native';
import { UserList, UserSearch } from "../assets/ApiUrl";

export default class Contacts extends Component {
  
  constructor(){
     super();
     this.state ={
       SwitchOnValueHolder :  false,
       selected: undefined,
       search_term:"",
       list:[{}]
      }
    }
    onValueChange(value : string) {
      this.setState({
        selected: value
      });
    }



ShowAlert = (value) =>{
  this.setState({
    SwitchOnValueHolder: value
  })
 
  // if(value == true)
  // {
  //   Alert.alert("Switch is On.");
  // }
  // else{
  //   Alert.alert("Switch is Off.");
  // }
 
}


componentDidMount(){      
  this.UserListApi()      
}

UserListApi = () =>{
  console.log("In UserListApi")
  fetch(UserList, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      //console.log("UserList Response", data)
      if(data.message=="text message."){
        this.setState({list:data.records})
        
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

  SearchByDetailsApi = (text) =>{
    console.log("SearchByDetails")
    this.state.search_term=text
    console.log(this.state.search_term)
    fetch(UserSearch, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        input: this.state.search_term
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("UserList Response", data)
        if(data.msgclass=="text-success"){
          this.setState({list:data.cust_records})
          
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

   
    if(!this.state.SwitchOnValueHolder){
      return (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" onChangeText={(text)=>{this.SearchByDetailsApi(text)}}/>
              <Icon name="ios-people" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
            <Switch
            onValueChange={(value) => this.ShowAlert(value)}
            style={{marginBottom: 10}}
            value={this.state.SwitchOnValueHolder} />
          </Header>
          
          
          <Content>

          <ScrollView>
            <List>
                    {this.state.list.map(item=>(
                        <ListItem key={item.user_id} avatar 
                        onPress={()=>{ this.props.navigation.navigate('UserProfile',{
                          user_id:item.user_id
                      })
                      }} >
                        <Left>
                            <Thumbnail source={{ uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-f86ca6f98affc4bfe9306d9693638920.png' }} />
                        </Left>
                        <Body >
                            <Text>{item.name}</Text>
                            <Text note>{item.professional}</Text>
                            <Text note>{item.mobile_no}</Text>
                        </Body>
                    </ListItem>
              ))}
              
            </List>
            </ScrollView>
          </Content>
        </Container>
      );
    }
    else{
      return (
        <Container>
          <Header>
          <Picker
              style={{borderWidth: 1 ,borderColor:'white',color:'white'}}
              mode="dropdown"
              Icon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Doctor" value="key0" />
              <Picker.Item label="Engineer" value="key1" />
              <Picker.Item label="CA" value="key2" />
              <Picker.Item label="Lawyer" value="key3" />
              <Picker.Item label="Other" value="key4" />
            </Picker>
            <Switch
            onValueChange={(value) => this.ShowAlert(value)}
            style={{marginBottom: 10}}
            value={this.state.SwitchOnValueHolder} />
          </Header>
          
          
          <Content>
            <ScrollView>
          <List>
                    {this.state.list.map(item=>(
                    <ListItem key={item.user_id} avatar >
                        <Left>
                            <Thumbnail source={{ uri: 'http://www.myiconfinder.com/uploads/iconsets/256-256-f86ca6f98affc4bfe9306d9693638920.png' }} />
                        </Left>
                        <Body >
                            <Text>{item.name}</Text>
                            <Text note>{item.professional}</Text>
                            <Text note>{item.mobile_no}</Text>
                        </Body>
                    </ListItem>
              ))}
              
            </List>
            </ScrollView>
          </Content>
        </Container>
      );
    }
    
  }
}