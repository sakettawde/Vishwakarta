import React, { Component } from 'react';
import { Image ,Dimensions ,View,StyleSheet} from 'react-native';
import {  Card, CardItem, Thumbnail, Text, Button, Left, Right , Body ,Icon } from 'native-base';
import Swiper from 'react-native-swiper';

export default class FeedCard extends Component {

    state={
      like:true,
      count:1988
    }

  toggleLike=()=>{
    if(this.state.like){
      this.setState({count:this.state.count-1})
    }
    else{
      this.setState({count:this.state.count+1})
    }
    this.setState({like:!this.state.like})
    
  }
    
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
              
              <Swiper style={styles.wrapper} loop={false} >
                <View style={styles.slide}>
                  <Image source={{uri: 'https://wallpaper-house.com/data/out/2/wallpaper2you_20995.jpg'}} 
                  style={{flex:1 ,height: 200, width: Dimensions.get('window').width}}/>
                </View>
                <View style={styles.slide}>
                  <Image source={{uri: 'https://wallpaper-house.com/data/out/2/wallpaper2you_20996.jpg'}} 
                  style={{flex:1 ,height: 200, width: Dimensions.get('window').width}}/>
                </View>
              </Swiper>
                  
                <Text>
                Modal navigation drawers block interaction with the rest of an app’s content with a scrim.
                They are elevated above most of the app’s UI and don’t affect the screen’s layout grid.
                </Text>
              </Body>
            </CardItem>


            <CardItem>  
              <Left>
                <Button transparent textStyle={{color: '#87838B'}} 
                onPress={()=>this.toggleLike()}>

                {this.state.like?(<Icon name="ios-heart" />):
                (<Icon name="ios-heart-outline" />)}
                  
                  <Text>{this.state.count} Likes</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent textStyle={{color: '#87838B'}}
                onPress={()=>{this.props.navigation.navigate('Comments')}}>
                  <Icon name="md-chatboxes" />
                  <Text>1,926 Comments</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    height: 200, 
    width: Dimensions.get('window').width,
    

  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height:200
    
  }
})