import React, { Component } from 'react';
import { Image ,Dimensions ,View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Left, Right , Body ,Icon } from 'native-base';
export default class FeedCard extends Component {

  render() {
    return (
        
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://facebook.github.io/react/logo-og.png'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'https://wallpaper-house.com/data/out/2/wallpaper2you_20995.jpg'}} 
                style={{height: 200, width: Dimensions.get('window').width}}/>
                <Text>
                  #Selfie
                </Text>
              </Body>
            </CardItem>
            <CardItem>  
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="ios-heart" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="md-chatboxes" />
                  <Text>1,926 stars</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
    );
  }
}