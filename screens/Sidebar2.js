import React from "react";
import { Image,ImageBackground,StatusBar,AsyncStorage } from "react-native";
import {  Text, List, ListItem, Left, Thumbnail, Icon, Body } from "native-base";
import {FlexColumn} from "../utils/styles"
import styled from "styled-components"

const routes = ["Wall", "Profile", "Contacts","Logout"];
export default class SideBar extends React.Component {

  state={
    user_name:""
  }
  componentDidMount(){
    this._retrieveData()
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_name');
      await this.setState({user_name:value})
      console.log("name ",value)
      this.AdminFeedApi();
     } catch (error) {
       console.log(error)
     }
  }
  render() {
    return (
      <FlexColumn style={{marginTop: StatusBar.currentHeight,}}>
        
         
             
            <Image  source={{uri: "https://res.cloudinary.com/jerrick/image/upload/f_auto,fl_progressive,q_auto,c_fit,w_1100/t3onxzmjhmfbbah9ahzi"}} 
             style={{marginTop:78,marginLeft:16,marginRight:192,height:80,width:80 ,borderRadius:40}}/>
           
           
          
        
          <NameText style={{marginTop:52,marginLeft:18,}}>{this.state.user_name}</NameText>
          <SubText style={{marginLeft:18}}>Pune</SubText>
          {/* <View
              style={{
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
              }}
            /> */}

         
          {/* <List
            style={{marginTop:20}}
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem icon 
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Left>
                  <Icon active name="md-contact" />
                  </Left>
                  <Body>
                  <Text>{data}</Text>
                  </Body>
                </ListItem>
              );
            }}
          /> */}
          <List>
          <ListItem icon 
                  button
                  onPress={() => this.props.navigation.navigate("Wall")}>
                  <Left>
                  <Icon active name="md-desktop" />
                  </Left>
                  <Body>
                  <Text>Wall</Text>
                  </Body>
                </ListItem>
                <ListItem icon 
                  button
                  onPress={() => this.props.navigation.navigate("Profile")}>
                  <Left>
                  <Icon active name="md-person" />
                  </Left>
                  <Body>
                  <Text>Profile</Text>
                  </Body>
                </ListItem>
                <ListItem icon 
                  button
                  onPress={() => this.props.navigation.navigate("Contacts")}>
                  <Left>
                  <Icon active name="md-contact" />
                  </Left>
                  <Body>
                  <Text>Contacts</Text>
                  </Body>
                </ListItem>
                <ListItem icon 
                  button
                  onPress={() => this.props.navigation.navigate("Logout")}>
                  <Left>
                  <Icon active name="md-log-out" />
                  </Left>
                  <Body>
                  <Text>Logout</Text>
                  </Body>
                </ListItem> 
          </List>
      </FlexColumn>
    );
  }
}

const NameText=styled.Text`
width: 146px;
height: 22px;
font-size: 17px;
font-weight: 600;
font-style: normal;

color: rgba(3, 15, 41, 0.9);`


const SubText=styled.Text`
width: 74px;
height: 16px;
font-size: 12px;
font-weight: normal;
font-style: normal;

color: rgba(3, 15, 41, 0.4);`