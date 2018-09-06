import React from "react";
import { Image } from "react-native";
import { Container, Content, Text, List, ListItem, Left, Thumbnail } from "native-base";
const routes = ["Wall", "Profile", "Contacts","Logout"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri: "https://res.cloudinary.com/jerrick/image/upload/f_auto,fl_progressive,q_auto,c_fit,w_1100/t3onxzmjhmfbbah9ahzi"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
            {/* <Left>
            <Thumbnail square small source={{uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}} />
            </Left> */}
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
        </Content>
      </Container>
    );
  }
}