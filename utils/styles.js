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
  color:  rgba(3, 15, 41, 0.9);
`
export const FlexRow = styled.View`
  display: flex;
  flex-direction: row;
`