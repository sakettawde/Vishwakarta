import React from 'react';
import { StyleSheet, Text, View ,Button } from 'react-native';
import {Header , Left , Right , Icon} from 'native-base';


export default class Newpost extends React.Component {
  render() {
    return (
     <View style={styles.container}>
     	<Text>Add a new Post</Text>
     </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
