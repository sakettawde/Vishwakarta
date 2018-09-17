import React from "react";
import { Image,ImageBackground,StatusBar,View } from "react-native";
import {  Text, List, ListItem, Left, Thumbnail, Icon, Body } from "native-base";
import {FlexColumn} from "../utils/styles"
import styled from "styled-components"

const routes = ["Wall", "Profile", "Contacts","Logout"];
export default class SideBar extends React.Component {
  render() {
    return (
      <FlexColumn style={{marginTop: StatusBar.currentHeight,}}>
        
          <ImageBackground
            source={{
              uri: "https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&h=350"
            }}
            style={{
              height: 112,
              alignSelf: "stretch",

            }}>
             
            <Image  source={{uri: "https://res.cloudinary.com/jerrick/image/upload/f_auto,fl_progressive,q_auto,c_fit,w_1100/t3onxzmjhmfbbah9ahzi"}} 
             style={{marginTop:78,marginLeft:16,marginRight:192,height:80,width:80 ,borderRadius:40}}/>
           
           
          
           
          </ImageBackground>
          <NameText style={{marginTop:52,marginLeft:18,}}>Peter Parker</NameText>
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