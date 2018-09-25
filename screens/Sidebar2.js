import React from "react";
import { Image,TouchableOpacity,StatusBar,AsyncStorage,View,Text,Alert } from "react-native";
import {FlexColumn,FlexRow} from "../utils/styles"
import styled from "styled-components"
import { Icon } from "native-base";
import {ProfSearch,NearMe} from '../assets/ApiUrl';
import { StackActions, NavigationActions } from 'react-navigation';


const routes = ["Wall", "Profile", "Contacts","Logout"];
export default class SideBar extends React.Component {

  state={
    user_name:"",
    avatar:null,
    cvillage:"",
    prof:"",
    prof_count:1,
    cpincode:"",
    near_me:1
  }
  componentDidMount(){
    this._retrieveData()
    
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_name');
      const value2 = await AsyncStorage.getItem('avatar');
      const value3 = await AsyncStorage.getItem('cvillage');
      const value4 = await AsyncStorage.getItem('prof');
      this.SearchByProfApi(value4)
      const value5 = await AsyncStorage.getItem('cpincode');
      console.log("Cpin ",value5)
      this.NearMeApi(value5)


      // console.log(value2)
      await this.setState({user_name:value,avatar:value2,cvillage:value3,prof:value4,cpincode:value5})
      console.log("name ",value)
     } catch (error) {
       console.log(error)
     }
  }


  SearchByProfApi = (prof) =>{
    console.log("SearchByProf")
    
    
    fetch(ProfSearch, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        profession: prof
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("UserList Response", data)
        if(data.message=="Data available"){
          this.setState({prof_count:data.pCount})
          //console.log("data ",data)
          
        }
        else {
          Alert.alert(data)
        }    
      })
      .catch((error)=>{
        console.log("Api call error");
        console.log(error.message);
     });
  
    }
    
  NearMeApi = (value) =>{
    console.log("NearMeApi")
    
    
    fetch(NearMe, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        cpincode: value
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("UserList Response", data)
        if(data.message=="Data available"){
          this.setState({near_me:data.near})
        //  console.log("data ",data)
          
        }
        else {
          Alert.alert(data)
        }    
      })
      .catch((error)=>{
        console.log("Api call error");
        console.log(error.message);
     });
  
    }
    handleLogout=()=>{
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  render() {
    return (
      <FlexColumn style={{marginTop: StatusBar.currentHeight,flex:1}}>
        
         <View style={{width:"100%",height:150}}>
        
            <TouchableOpacity  onPress={()=>{this.props.navigation.navigate('Profile')}}> 
            <Image  source={{uri:this.state.avatar}}
             style={{marginTop:15,height:80,width:80 ,borderRadius:40,alignSelf:"center"}}
            />
           
           
          
          <View style={{marginTop:12}}>         
          <NameText style={{textAlign: 'center'}}>{this.state.user_name}</NameText>
          <SubText style={{textAlign: 'center'}}>{this.state.cvillage}</SubText>
          </View>
          </TouchableOpacity>
          </View>

            <FlexRow style={{flex:.3}}></FlexRow>
            <FlexRow style={{flex:.8}}>
              <View style={{flex: 1,}}>
                <ColumnButton style={{alignItems:'center',justifyContent: 'center',}}
                onPress={()=>{this.props.navigation.navigate('List',{
                  info:"prof"
                })}}>
                  <NumberText>{this.state.prof_count-1}</NumberText>
                  <NumberSubText>{this.state.prof}</NumberSubText>
                </ColumnButton>
              </View>
              <View style={{flex: 1,}}>
                <ColumnButton style={{alignItems:'center',justifyContent: 'center',}}
                onPress={()=>{this.props.navigation.navigate('List',{
                  info:"near_me"
                })}}>
                  <NumberText>{this.state.near_me-1}</NumberText>
                  <NumberSubText>Near Me</NumberSubText>
                </ColumnButton>
              </View>
              <View style={{flex: 1,}}>
                <ColumnButton style={{alignItems:'center',justifyContent: 'center',}}
                onPress={()=>{this.props.navigation.navigate('Contacts')}}>
                  <NumberText>10</NumberText>
                  <NumberSubText>My Mentor</NumberSubText>
                </ColumnButton>
              </View>
            </FlexRow>
             <View
              style={{
                borderBottomColor: '#c2c2d6',
                borderBottomWidth: 1,
              }}
            />
            <FlexRow style={{flex:.1}}></FlexRow>
            
            <FlexRow style={{flex:1}}>
              <View style={{flex: 1,}}>
                  <ColumnButton style={{alignItems:'center',justifyContent: 'center',}}
                  onPress={()=>{this.props.navigation.navigate('Contacts')}}>
                  <Icon active name="md-contact" />
                    <Text>Explore</Text>
                  </ColumnButton>
                </View>
                <View style={{flex: 1,}}>
                  <ColumnButton style={{alignItems:'center',justifyContent: 'center',}}
                  onPress={()=>{this.props.navigation.navigate('List',{
                    info:"chats"
                  })}}>
                  <Icon active name="md-chatbubbles" />
                    <Text>My Chats</Text>
                  </ColumnButton>
                </View>
            </FlexRow>
            <FlexRow style={{flex:1}}>
            <View style={{flex: 1,}}>
                  <ColumnButton style={{alignItems:'center',justifyContent: 'center',}}
                  onPress={()=>{this.props.navigation.navigate('MentorStudent')}}>
                  <Icon active name="md-school" />
                    <Text>Mentor</Text>
                  </ColumnButton>
                </View>
                <View style={{flex: 1,}}>
                  <ColumnButton style={{alignItems:'center',justifyContent: 'center',}}>
                  <Icon active name="md-settings" />
                    <Text>Settings</Text>
                  </ColumnButton>
                </View>
            </FlexRow>
            <FlexRow style={{flex:1}}>
            <View style={{flex: 1,}}>
                  <ColumnButton style={{alignItems:'center',justifyContent: 'center',}}
                  onPress={()=>{this.props.navigation.navigate('HelpPage')}}>
                  <Icon active name="md-help" />
                    <Text>Help</Text>
                  </ColumnButton>
                </View>
                <View style={{flex: 1,}}>
                  <ColumnButton style={{alignItems:'center',justifyContent: 'center',}}
                  onPress={()=>{this.props.navigation.navigate('AreaHead')}}>
                  <Icon active name="md-medal" />
                    <Text>Area Head</Text>
                  </ColumnButton>
                </View>
            </FlexRow>
            <FlexRow style={{flex:1}}>
            <View style={{flex: 1,}}>
                  <ColumnButton style={{alignItems:'center',justifyContent: 'center',}}
                  onPress={()=>this.handleLogout()}>
                  <Icon active name="md-log-out" />
                    <Text>Logout</Text>
                  </ColumnButton>
                </View>
                
            </FlexRow>


        
         
      </FlexColumn>
    );
  }
}

const NameText=styled.Text`
height: 22px;
font-size: 17px;
font-weight: 600;
font-style: normal;
color: rgba(3, 15, 41, 0.9);`


const SubText=styled.Text`
height: 16px;
font-size: 12px;
font-weight: normal;
font-style: normal;

color: rgba(3, 15, 41, 0.4);`

const NumberText=styled.Text`
height: 22px;
font-size: 19px;
font-weight: 400;
font-style: normal;
color: rgba(3, 15, 41, 0.9);`

const NumberSubText=styled.Text`
height: 16px;
font-size: 14px;
font-weight: normal;
font-style: normal;
color: rgba(3, 15, 41, 0.4);`

const ColumnButton=styled.TouchableOpacity`
display: flex;
flex-direction: column;
elevation:-2;`