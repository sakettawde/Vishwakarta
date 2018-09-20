import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text ,
Content , List , ListItem , Left , Body , Right , Thumbnail, Picker } from 'native-base';
import {Switch ,Alert,ScrollView,StatusBar} from 'react-native';
import { UserList, UserSearch } from "../assets/ApiUrl";


export default class Contacts extends Component {
  
  constructor(){
     super();
     this.state ={
       SwitchOnValueHolder :  false,
       selected: undefined,
       search_term:"",
       list:[{}],
       user_id:"",
       prof_name:"",
       proflist:[ ],
       selected_prof:0
      }
    }
    componentDidMount(){      
      this.UserListApi()
     
    }
   

    




UserListApi = () =>{
  console.log("In UserListApi")
  fetch(UserList, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      //console.log("UserList Response", data)
      if(data.message=="text message."){
        this.setState({list:data.records})
        
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

//   SearchByDetailsApi = (text) =>{
//     console.log("SearchByDetails")
//     this.state.search_term=text
//     console.log(this.state.search_term)
//     fetch(UserSearch, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ 
//         input: this.state.search_term
//       })
//     })
//       .then(data => {
//         return data.json()
//       })
//       .then(data => {
//         //console.log("UserList Response", data)
//         if(data.msgclass=="text-success"){
//           this.setState({list:data.cust_records})
          
//         }
//         else {
//           Alert.alert(data)
//         }    
//       })
//       .catch((error)=>{
//         console.log("Api call error");
//         console.log(error.message);
//      });
  
//     }
  

  render() {

   
    
      return (
        <Container style={{marginTop: StatusBar.currentHeight}}>  
          <Content>

          <ScrollView>
            <List>
                    {this.state.list.map((item,index)=>(
                        <ListItem key={index} avatar 
                        onPress={()=>{ this.props.navigation.navigate('UserProfile',{
                          user_id:item.user_id,
                         // current_id:this.state.user_id
                      })
                      }} >
                        <Left>
                            <Thumbnail source={{ uri:item.avatar  }} />
                        </Left>
                        <Body >
                            <Text>{item.name}</Text>
                            <Text note>{item.professional}</Text>
                            <Text note>{item.mobile_no}</Text>
                        </Body>
                    </ListItem>
              ))}
              
            </List>
            </ScrollView>
          </Content>
        </Container>
      );
  
    
       
     
    }
    
  
}   