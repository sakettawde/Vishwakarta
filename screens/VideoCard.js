import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import {View,WebView,StyleSheet,Platform} from 'react-native';
import styled from 'styled-components';
import {LinearGradient} from 'expo';

export default class VideoCard extends Component {
  render() {
    return (
      
            <MyCard>
                 <LinearGradient
                colors={["#0f4cad", "#0341a3"]}
                start={{ x: 0.0, y: 0.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={{ borderRadius:10}}
              >
                <FlexColumn>
                
                    <View style={{elevation:3,marginBottom:5,marginTop:3}}>
                   
                        <NameText >
                           {this.props.header}
                        </NameText>
                    </View>
                   

                <View style= {{height:300,margin:3}} >
        
                        <WebView
                                style={ styles.WebViewContainer }
                                javaScriptEnabled={true}
                                domStorageEnabled={true}
                                source={{uri: this.props.link }}
                            />

                    </View>
                </FlexColumn>
                </LinearGradient>

            </MyCard>
               
     
        
    );
  }
}
const styles = StyleSheet.create({
 
    WebViewContainer: {
     
        marginTop: (Platform.OS == 'ios') ? 20 : 0,
     
      }
      
    });

const MyCard = styled.View`
elevation:4;
margin-top:14px;
margin-left:14px;
margin-right:14px;
border-radius: 8px;
  background-color: #ffffff;`

export const FlexColumn = styled.View`
  display: flex;
  flex-direction: column;
`
const NameText=styled.Text`
height: 30px;
font-size: 22px;
font-weight: 500;
font-style: normal;
text-align: center;
color: #ffffff;`