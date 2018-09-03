import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text ,
Content , List , ListItem , Left , Body , Right , Thumbnail, Picker } from 'native-base';
import {Switch ,Alert} from 'react-native';

export default class Contacts extends Component {
  
  constructor(){
     super();
     this.state ={
       SwitchOnValueHolder :  false,
       selected: undefined
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
 
  if(value == true)
  {
    Alert.alert("Switch is On.");
  }
  else{
    Alert.alert("Switch is Off.");
  }
 
}


  openContact = () => {
    this.props.navigation.navigate('UserProfile')
  }

  render() {

    let contacts = [
    {
      avatarURL: "",
      name: "Kumar Pratik",
      profession: "CA"
    },
    {
      avatarURL: "",
      name: "John Rambo",
      profession: "Engineer"
    }]
    if(this.state.SwitchOnValueHolder){
      return (
        <Container>
          <Header searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
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
            <List>
            {contacts.map(item=>(
              <ListItem key={item.name} avatar onPress={this.openContact}>
                <Left>
                  <Thumbnail source={{ uri: 'Image URL' }} />
                </Left>
                <Body >
                  <Text>{item.name}</Text>
                  <Text note>{item.profession}</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
              ))}
              
            </List>
          </Content>
        </Container>
      );
    }
    else{
      return (
        <Container>
          <Header>
          <Picker
              style={{borderWidth: 1 ,borderColor:'#A9A9A9'}}
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
            <List>
            {contacts.map(item=>(
              <ListItem key={item.name} avatar onPress={this.openContact}>
                <Left>
                  <Thumbnail source={{ uri: 'Image URL' }} />
                </Left>
                <Body >
                  <Text>{item.name}</Text>
                  <Text note>{item.profession}</Text>
                </Body>
                <Right>
                  <Text note>3:43 pm</Text>
                </Right>
              </ListItem>
              ))}
              
            </List>
          </Content>
        </Container>
      );
    }
    
  }
}