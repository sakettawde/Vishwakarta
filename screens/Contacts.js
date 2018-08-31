import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text ,
Content , List , ListItem , Left , Body , Right , Thumbnail } from 'native-base';

export default class Contacts extends Component {
  
  openContact = () => {
    console.log(JSON.stringify(this.props))
    this.props.navigation.navigate('Profile')
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