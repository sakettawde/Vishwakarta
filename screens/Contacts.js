import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text ,
Content , List , ListItem , Left , Body , Right , Thumbnail, Picker } from 'native-base';
import {Switch ,Alert,ScrollView,StatusBar} from 'react-native';
import { UserList, UserSearch,ListProf,ProfSearch } from "../assets/ApiUrl";


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
       selected_prof:1
      }
    }
    componentDidMount(){      
      this.UserListApi()
      this.prof_renderer()
    }
    onValueChange(value : string) {
      this.setState({
        selected: value
      });
    }

    
   
    prof_renderer=()=>{
      console.log("In Prof Api")
      fetch(ListProf, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({  })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          if(data.message=="Data available"){
            this.setState({proflist:data.records})
          
            
            // console.log(data.records)                  
             console.log(this.state.selected_prof)            
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

ShowAlert = (value) =>{
  this.setState({
    SwitchOnValueHolder: value
  })
 
  // if(value == true)
  // {
  //   Alert.alert("Switch is On.");
  // }
  // else{
  //   Alert.alert("Switch is Off.");
  // }
 
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

  SearchByDetailsApi = (text) =>{
    console.log("SearchByDetails")
    this.state.search_term=text
    console.log(this.state.search_term)
    fetch(UserSearch, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        input: this.state.search_term
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("UserList Response", data)
        if(data.msgclass=="text-success"){
          this.setState({list:data.cust_records})
          
          
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

    SearchByProfApi = () =>{
      console.log("SearchByProf")
      
      console.log(this.state.search_term)
      fetch(ProfSearch, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          profession: this.state.prof_name
        })
      })
        .then(data => {
          return data.json()
        })
        .then(data => {
          //console.log("UserList Response", data)
          if(data.msgclass=="Data available"){
            this.setState({list:data.cust_records})
            
            
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
      onProfChange=async(value )=> {
        
        var temp=this.state.proflist.find((item)=>{
          return item.id ===this.state.selected_prof
        })
        await this.setState({
          prof_name: temp.name,selected_prof:value
        });
        console.log(this.state.prof_name)
      }
  

  render() {

   
    
      return (
        <Container style={{marginTop: StatusBar.currentHeight}}>
          
          {this.state.SwitchOnValueHolder?(
            <Header>
             <Picker
              style={{borderWidth: 1 ,borderColor:'#fffff',color:'#fff'}}
              mode="dropdown"
              placeholder="Select"
              Icon={<Icon name="ios-arrow-down" />}
              selectedValue={this.state.selected_prof}
              onValueChange={this.onProfChange.bind(this)}
            >

              {this.state.proflist.map(item => (
                <Picker.Item key={item.id} label={item.name} value={item.id}></Picker.Item>
               ))}
            </Picker>
            <Switch
            onValueChange={(value) => this.ShowAlert(value)}
            style={{marginBottom: 10}}
            value={this.state.SwitchOnValueHolder} />
            </Header>
          
          ):(
            <Header searchBar rounded>
             <Item>
             <Icon name="ios-search" />
             <Input placeholder="Search" onChangeText={(text)=>{this.SearchByDetailsApi(text)}}/>
             <Icon name="ios-people" />
           </Item>
           <Button transparent>
             <Text>Search</Text>
           </Button>
           <Switch
          onValueChange={(value) => this.ShowAlert(value)}
          style={{marginBottom: 10}}
          value={this.state.SwitchOnValueHolder} />
           </Header>
           
          )}
          
         
           

          
         
          
          
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