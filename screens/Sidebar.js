import React from "react";
import { Image } from "react-native";
import { Container, Content, Text, List, ListItem, Left, Thumbnail } from "native-base";
import {FlexColumn} from "../utils/styles"
import styled from "styled-components"

const routes = ["Wall", "Profile", "Contacts","Logout"];
export default class SideBar extends React.Component {
  render() {
    return (
      <FlexColumn>
        
          <Image
            source={{
              uri: "https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&h=350"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
           
          </Image>
          <Text>Peter Parker</Text>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
      </FlexColumn>
    );
  }
}