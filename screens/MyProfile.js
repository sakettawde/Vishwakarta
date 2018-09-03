import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image
} from 'react-native';
import {Text , Label , Left ,Right ,Container, Header, Content, List, ListItem,Title, Input, Button } from 'native-base';


export default class ProfileSettings extends React.Component {
  constructor(){
    super();
    this.state = {
      value:  false,
      Name: 'Peter Parker',
      MobileNo: '9879879879',
      BirthDate: '03/03/26',
      Profession:'Social Worker',
      Gotra :'Kshatriya',
      Pincode:'444709'

    }
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
              <Input placeholder={this.state.Name} editable={this.state.value}/>
            </ListItem>

             <ListItem>
            <Left style={{flex:1}}>
              <Text>Contact</Text>
            </Left>
              <Input placeholder={this.state.MobileNo} editable={this.state.value}/>
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>BirthDate</Text>
            </Left>
              <Input placeholder={this.state.BirthDate} editable={this.state.value}/>
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Profession</Text>
            </Left>
              <Input placeholder={this.state.Profession} editable={this.state.value}/>
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Gotra</Text>
            </Left>
              <Input placeholder={this.state.Gotra} editable={this.state.value}/>
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Pincode</Text>
            </Left>
              <Input placeholder={this.state.Pincode} editable={this.state.value}/>
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
