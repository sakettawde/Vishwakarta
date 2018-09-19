import React from 'react';
import { StyleSheet, Text, View ,Button } from 'react-native';
import {Header , Left , Right , Icon} from 'native-base';

export default class HomeScreen extends React.Component {
 
  render() {
    return (
     <View style= {{flex: 1 , backgroundColor: '#fff'}} >
      
      <View style={{ flex : 1,
                    alignItems: 'center',
                    justifyContent: 'center'}}>
     	  <Text>Videos Here</Text>
         </View>
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
