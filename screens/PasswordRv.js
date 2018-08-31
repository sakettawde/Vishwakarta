import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Left, Right, Icon, Button } from 'native-base';

export default class PasswordRv extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is your Password Recovery</Text>

        <Button
          rounded
          full
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}>
          <Text style={{ color: 'red' }}>Next</Text>
        </Button>
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
