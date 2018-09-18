import React from 'react';
import { StyleSheet, Text, View ,Button ,TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export default class HelpPage extends React.Component {
  
  render() {
    return (
     <View style= {{flex: 1 , backgroundColor: '#fff',alignItems:"center",justifyContent:"center"}} >
        <CustomText style={{marginBottom: 20,}}>If you really need help press the Button </CustomText>
        <CustomButton style= {{alignItems:"center",justifyContent:"center"}}>
            <Text>Press Me</Text>
        </CustomButton>
     </View>
    );
  }
}

const CustomButton = styled.TouchableOpacity`
background-color: #cc0000;
height: 200px;
width:200px;
elevation:6;
border-radius:100px;`

const CustomText=styled.Text`
height: 22px;
font-size: 17px;
font-weight: 600;
font-style: normal;
color: rgba(3, 15, 41, 0.9);`

const ButtonText=styled.Text`
height: 30px;
font-size: 30px;
font-weight: 400;
font-style: normal;
color: rgba(3, 15, 41, 0.9);`