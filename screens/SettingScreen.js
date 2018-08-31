import React from 'react';
import { StyleSheet, Text, View ,Button } from 'react-native';
import {Header , Left , Right , Icon} from 'native-base';


export default class SettingScreen extends React.Component {
  static navigationOptions={
    drawerIcon:({tintColor})=>(
      <Icon name='settings' style={{fontSize: 24 ,color : tintColor}}/>
    )
  }
  render() {
    return (
     <View style={styles.container}>
     	<Text>SettingScreen</Text>
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
