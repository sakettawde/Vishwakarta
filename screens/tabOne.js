import React, { Component } from 'react';
import FeedCard from './FeedCard';
import { StyleSheet, Text, View ,Button,ScrollView,RefreshControl } from 'react-native';
import { StyleProvider } from 'native-base';


export default class tabOne extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});

    this.setState({refreshing: false});
  }
  render(){
    return(
      <ScrollView style={{paddingVertical: 10}}
          pinchGestureEnabled={true}
          refreshControl={<RefreshControl refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>}>
        <FeedCard/>
        <FeedCard/>
        <FeedCard/>
      </ScrollView>
      
    );
  }
}