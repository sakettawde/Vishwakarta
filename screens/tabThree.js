import React, { Component } from 'react';
import FeedCard from './FeedCard';
import { StyleSheet, Text, View ,Button ,ScrollView} from 'react-native';


export default class tabThree extends Component{
  render(){
    return(
      <ScrollView style={{paddingVertical: 10}}>
       <FeedCard {...this.props}/>
        <FeedCard {...this.props}/>
        <FeedCard {...this.props}/>
      </ScrollView>
    );
  }
}