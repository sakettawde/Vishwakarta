import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text ,
Content , List , ListItem , Left , Body , Right , Thumbnail, } from 'native-base';
import {Alert,ScrollView,StatusBar,AsyncStorage,View} from 'react-native';
import { ProfSearch,NearMe,ViewChat } from "../assets/ApiUrl";
import {LinearGradient} from 'expo';


export default class Contacts extends Component {
  
  constructor(){
     super();
     this.state ={
      prof:"",
      user_id:"",
      render_info:"",
      list:{},
      }
    }
    componentDidMount(){   
      let temp=this.props.navigation.getParam('info', '');
      this.setState({render_info:temp})
      if (temp=="prof"){
        this._retrieveDataProf()
      } 
      else if(temp=="near_me"){
        this._retrieveDataNearMe()
      }  
      else if(temp=="chats"){
        this._retrieveDataChats()
      }
    }
    _retrieveDataProf = async () => {
      try {
        // const value = await AsyncStorage.getItem('user_name');
        // const value2 = await AsyncStorage.getItem('avatar');
        // const value3 = await AsyncStorage.getItem('cvillage');
        const value = await AsyncStorage.getItem('user_id');
        this.setState({user_id:value})
        const value4 = await AsyncStorage.getItem('prof');
        console.log("prof ",value4)
        this.SearchByProfApi(value4)
        // console.log(value2)
       
       } catch (error) {
         console.log(error)
       }
    }
  
    _retrieveDataNearMe = async () => {
      try {
        const value = await AsyncStorage.getItem('user_id');
        this.setState({user_id:value})
        const value5 = await AsyncStorage.getItem('cpincode');
        console.log("Cpin ",value5)
        this.NearMeApi(value5)
       } catch (error) {
         console.log(error)
       }
    }
    _retrieveDataChats = async () => {
      try {
        const value = await AsyncStorage.getItem('user_id');
        this.setState({user_id:value})
      
        this.ViewChatApi(value)
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
            this.setState({list:data.records})
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
            this.setState({list:data.records})
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

      ViewChatApi = (value) =>{
        console.log("ViewChatApi")
        
        
        fetch(ViewChat, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
            userId: value
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            //console.log("UserList Response", data)
            if(data.message=="chat View"){
              // const unique = [...new Set(data.records.map(item => item.user_id))];
              // const unique=array.map(item => item.user_id).filter((value, index, self) => self.indexOf(value) === index)
              // console.log(unique);

              this.setState({list2:data.records})
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
    




// UserListApi = () =>{
//   console.log("In UserListApi")
//   fetch(UserList, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ })
//   })
//     .then(data => {
//       return data.json()
//     })
//     .then(data => {
//       //console.log("UserList Response", data)
//       if(data.message=="text message."){
//         this.setState({list:data.records})
        
//       }
//       else {
//         Alert.alert(data)
//       }    
//     })
//     .catch((error)=>{
//       console.log("Api call error");
//       console.log(error.message);
//    });

//   }


  

  render() {

   
    
      return (
        <Container >
           
          <Content>

          <ScrollView>
            <List>
                    {this.state.list && this.state.list.length > 0 &&
                    this.state.list.map((item,index)=>{
                      return this.state.user_id!=item.user_id?
                        <ListItem key={index} avatar 
                        onPress={()=>{ this.props.navigation.navigate('UserProfile',{
                          user_id:item.user_id,
                          user_name:item.name
                         // current_id:this.state.user_id
                      })
                      }} >
                        <Left>
                            <Thumbnail source={{ uri:item.avatar  }} />
                        </Left>
                        <Body >
                            <Text >{item.name}</Text>
                            <Text note >{item.professional}</Text>
                            <Text note >{item.mobile_no}</Text>
                        </Body>
                    </ListItem>
                    :<View/>
                    })}

                  
                    {this.state.list2 && this.state.list2.length > 0 &&
                    this.state.list2.map((item,index)=>{
                      return this.state.user_id!=item.user_id?
                        <ListItem key={index} avatar 
                        onPress={()=>{ this.props.navigation.navigate('ChatPage',{
                          user_id:item.user_id,
                          user_name:item.name
                         // current_id:this.state.user_id
                      })
                      }} >
                        <Left>
                            <Thumbnail source={{ uri:item.avatar  }} />
                        </Left>
                        <Body >
                            <Text >{item.name}</Text>
                            <Text note >{item.professional}</Text>
                            <Text note >{item.mobile_no}</Text>
                        </Body>
                    </ListItem>
                    :<View/>
                    })}
                   
              
            </List>
            </ScrollView>
          </Content>
        </Container>
      );
  
    
       
     
    }
    
  
}   