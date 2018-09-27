import React, { Component } from "react";
import styled from 'styled-components';



export const NextButton=styled.TouchableOpacity`
margin-left: 40px;
margin-right:40px;
height: 50px;
border-radius: 10px;
background-color: #7c98fd;
justify-content:center;
align-items:center;
elevation:4;`

export const ButtonText=styled.Text`
font-size: 20px;
font-weight: 400;
font-style: normal;
text-align: center;
color: #ffffff;
margin-top:12px;
`

export const FlexColumn = styled.View`
  display: flex;
  flex-direction: column;
`

export const ScreenTitle = styled.Text`
  font-size: 28px;
  font-weight: 900;
  font-style: normal;
  text-align: center;
  color:  #ffffff;
`

export const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
`

export const ButtonText2 = styled.Text`
font-size: 18px;
  font-weight: 300;
  text-align: center;
  color: #00AA8A;
`

export const LoginButton = styled.TouchableOpacity`
border-radius: 5px;
height: 50px;
width:80%;
  background-color: #ffffff;
  justify-content:center;
  align-items:center;
  align-self:center;
  elevation:3;`

  export const StyledTextInput = styled.TextInput`
  font-size: 18px;
  color:#fff;
  flex:1;`
  
  export const TextLabel = styled.Text`
    font-size: 18px;
    font-weight: 300;
    font-style: normal;
    text-align: left;
    color: #ffffff;
    margin-right:20px;
  `
  
  export const TextField = styled.View`
    border-radius: 5px;
    width:80%;
    background-color: #00e6bb;
    padding: 20px;
  `