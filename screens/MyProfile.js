import React from 'react';
import {
  ScrollView,
  View,AsyncStorage,
  StatusBar,
  Image,Alert,TouchableOpacity,ImageBackground
} from 'react-native';
import {Text , Label , Left ,Right ,Container, Header, Content, List, ListItem,Title, Input, Button 
      , DatePicker,Picker,Icon,StyleProvider, Card, CardItem} from 'native-base';
import { Userinfo ,ListGotra ,ListProf ,PincodeUrl,EditUrl} from "../assets/ApiUrl";
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import styled from 'styled-components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class ProfileSettings extends React.Component {
  static navigationOptions = {
    title: 'My Profile',
  }
  constructor(){
    super();
    this.state = {
      value:  false,
      user_id:"",
      name:"",
      mobile_num:"",
      chosenDate: new Date(),
      selected_prof: 1,
      prof_name:"",
      gotra_name:"",
      selected_gotra: 1,
      showhome:false,
      homedata:false,
      home_pin: "",
      hvillage:"",
      htaluka:"",
      hdistrict:"",
      hstate:"",
      current_pin:"",
      cvillage:"",
      ctaluka:"",
      cdistrict:"",
      cstate:"",
      pincodeData:[],
      proflist:[],
      gotralist:[],
      
      records:[{}]

    };
    this.setDate = this.setDate.bind(this);
} 
_retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('user_id');
    await this.setState({user_id:value})
    console.log("id ",value)
    this.UserInfoApi(value)
   } catch (error) {
     console.log(error)
   }
  
}

componentDidMount(){
 this._retrieveData()
 
}

UserInfoApi = (value) =>{
  console.log("In UserInfoApi")
  fetch(Userinfo, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id:value
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log("UserInfo Response", data)
      if(data.message=="Data available"){
        this.setState({records:data.records[0]})
       // console.log(data.records[0])

        this.setState({
        name:data.records[0].name,
        mobile_num:data.records[0].mobile_no,
        password:data.records[0].password,
        chosenDate:data.records[0].dob,
        prof_name:data.records[0].professional,
        gotra_name:data.records[0].gotra,
        home_pin:data.records[0].home_pincode,
        current_pin:data.records[0].current_pincode,
        cvillage:data.records[0].cvillage,
        ctaluka:data.records[0].ctaluka,
        cdistrict:data.records[0].cdistrict,
        cstate:data.records[0].cstate,

        hvillage:data.records[0].hvillage,
        htaluka:data.records[0].htaluka,
        hdistrict:data.records[0].hdistrict,
        hstate:data.records[0].hstate})

        //console.log(this.state.records)
        //console.log(data.records)                  
        //console.log(this.state.records[0].name)
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

  gotra_renderer=()=>{
    fetch(ListGotra, {
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
          this.setState({gotralist:data.records})
          var temp=this.state.gotralist.find((item)=>{
            return item.gotra ===this.state.records.gotra
          })
          //console.log(temp)
          this.setState({
            selected_gotra: temp.id,
            gotra_name: temp.gotra
          });
        
          //console.log(this.state.records)
          //console.log(data.records)                  
          console.log(this.state.selected_gotra)            
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

  prof_renderer=()=>{
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
          var temp=this.state.proflist.find((item)=>{
            return item.name ===this.state.records.professional
          })
          this.setState({
            selected_prof: temp.id
          });
          this.setState({
            prof_name: temp.name
          });
          //console.log(this.state.records)
          //console.log(data.records)                  
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

  SaveApi = () =>{

    if(this.state.home_pin.length < 5){
      Alert.alert("Enter Valid Home Pincode")
      return
    }
    if(this.state.current_pin.length < 5){
      Alert.alert("Enter Valid Current Pincode")
      return
    }
    if(this.state.mobile_num.length < 10){
      Alert.alert("Enter Valid Mobile Number")
      return
    }

    console.log("In EditApi")
    fetch(EditUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id:this.state.user_id,
        name:this.state.name,
        mobile_no: this.state.mobile_num,
        password: this.state.password,
        dob:this.state.chosenDate.toString().substr(4,12),
        //status:this.info_array.toggle,
        professional:this.state.prof_name,
        home_pincode:this.state.home_pin,
        current_pincode:this.state.current_pin,
        gotra:this.state.gotra_name,
        hvillage:this.state.hvillage,
        htaluka:this.state.htaluka,
        hdistrict:this.state.hdistrict,
        hstate:this.state.hstate,
        cvillage:this.state.cvillage,
        ctaluka:this.state.ctaluka,
        cdistrict:this.state.cdistrict,
        cstate:this.state.cstate,
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
       // console.log("Signup Response", data)
        if(data.message=="succesfully updated"){
          Alert.alert("Updated Successfully")
        }          
        else{
          Alert.alert(data.message)
        }
      })
      .catch((error)=>{
        console.log("Api call error");
        console.log(error.message);
     });
  
    }


  onProfChange=async(value )=> {
    await this.setState({
      selected_prof: value
    });
    var temp=this.state.proflist.find((item)=>{
      return item.id ===this.state.selected_prof
    })
    await this.setState({
      prof_name: temp.name
    });
    console.log(this.state.prof_name)
  }
  
  onGotraChange=async(value )=> {
    await this.setState({
      selected_gotra: value
    });
    //console.log(value)
    var temp=this.state.gotralist.find((item)=>{
      return item.id ===this.state.selected_gotra
    })
    //console.log(temp)
    await this.setState({
      gotra_name: temp.gotra
    });
    //console.log(this.state.gotra_name)
  }

handleEditClick(e){
  this.setState({value:true})
  this.prof_renderer()
  this.gotra_renderer()
}

handleSaveClick=async()=>{
  if(this.state.value){
  this.setState({value:false})
  await this.SaveApi()
  this.UserInfoApi()
  
  }
}

setDate(newDate) {
  this.setState({ chosenDate: newDate });
}

pincodeApi=(pin)=>{
  fetch(PincodeUrl, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pincode:pin
    })
}).then(data => {
    return data.json();
}).then(data => {
  this.setState({pincodeData:data.record.PostOffice})
      if(data.record.PostOffice){
        console.log("data is available")
      }else{
        Alert.alert('Wrong Pincode')
        this.setState({pincodeData:[]})
      }
})
}

home_handler=(text)=>{
  this.setState({home_pin:text})
  //console.log(text)
  if(text.length < 6){
    this.setState({pincodeData:[]})
  }
  else{
  this.pincodeApi(text)
  this.setState({showhome:true})
  }
}

selectedHomePincode=(item)=>{
  //console.log('in home onPress')
  //console.log(item)
  this.setState({hvillage:item.Name,htaluka:item.Taluk,hdistrict:item.District,hstate:item.State,showhome:false})
}

current_handler=(text)=>{
  
 // console.log(text)
  if(text.length < 6){
    console.log(text)
  }
  else{
    
  this.pincodeApi(text)
  this.setState({showcurrent:true})
  }
}
selectedCurrentPincode=(item)=>{
  //console.log('in onPress')
  //console.log(item)
  this.setState({cvillage:item.Name})
  this.setState({ctaluka:item.Taluk})
  this.setState({cdistrict:item.District})
  this.setState({cstate:item.State})
  this.setState({showcurrent:false})
}


  render() {
    let info=this.state.records

    const {
      mobile_num,
      name,
      password,
      chosenDate,
      prof_name,
      gotra_name,
      current_pin,cdistrict,cstate,ctaluka,cvillage,
      home_pin,hvillage,htaluka,hdistrict,hstate
      
    } = this.state
    
    return (
      <StyleProvider style={getTheme(material)}>
      <Container>
        {/* <Header /> */}
        <Content>
         
            
            <Image  source={{uri: info.avatar}}
            style={{marginTop:15,height:80,width:80 ,borderRadius:40,alignSelf:"center"}}/> 

          
          <KeyboardAwareScrollView enableOnAndroid={true} style={{width:'100%'}}>

          <View style={{flexDirection:'column',marginBottom:10,marginLeft:10
                    ,marginRight: 10,elevation:5,backgroundColor:"#F8F8F8",
                    paddingTop:40,marginTop:-40}}>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Name</Text>
            </Left>
              <Input value={name} editable={this.state.value} 
                    onChangeText={(text)=>{this.setState({name : text})}}/>
            </ListItem>

             <ListItem>
            <Left style={{flex:1}}>
              <Text>Contact</Text>
            </Left>
              <Input value={mobile_num} editable={this.state.value}
                      onChangeText={(text)=>{this.setState({mobile_num : text})}}
                      keyboardType="numeric" maxLength={10}/>
            </ListItem>

            {this.state.value && 
            <ListItem>
              <Left>
              <Text>Password</Text>
            </Left>
              <Input value={password} 
                      onChangeText={(text)=>{this.setState({password : text})}}
                      secureTextEntry={true}/>
            </ListItem>
            }

            <ListItem>
            <Left style={{flex:1}}>
              <Text>BirthDate</Text>
            </Left>
            {this.state.value?(
               <DatePicker
               //defaultDate={this.state.records[0].dob}
               minimumDate={new Date(1975, 1, 1)}
               maximumDate={new Date(2018, 12, 31)}
               locale={"en"}
               timeZoneOffsetInMinutes={undefined}
               modalTransparent={false}
               animationType={"fade"}
               androidMode={"default"}
               placeHolderText={info.dob}
               textStyle={{ color: "green" }}
               placeHolderTextStyle={{ color: "#000" }}
               onDateChange={text=>this.setState({chosenDate:text})}
               
               />
               
            ):(
              <Input value={chosenDate.toString()} editable={false}/>
            )}
              
             
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Profession</Text>
            </Left>
            {this.state.value?(
              <Picker
              style={{borderWidth: 1 ,borderColor:"#A9A9A9"}}
              mode="dropdown"
              Icon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.selected_prof}
              onValueChange={this.onProfChange.bind(this)}
            >

              {this.state.proflist.map(item => (
                <Picker.Item key={item.id} label={item.name} value={item.id}></Picker.Item>
               ))}
            </Picker>

            ):(
              <Input placeholder={prof_name} editable={false}/>
            )}
              
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Gotra</Text>
            </Left>
            {this.state.value?(
             <Picker
             style={{borderWidth: 1 ,borderColor:'#A9A9A9'}}
             mode="dropdown"
             Icon={<Icon name="ios-arrow-down-outline" />}
             selectedValue={this.state.selected_gotra}
             onValueChange={this.onGotraChange.bind(this)}
           >

             
             {this.state.gotralist.map(item => (
               <Picker.Item key={item.id} label={item.gotra} value={item.id}></Picker.Item>
              ))}
           </Picker>

            ):(
              <Input placeholder={gotra_name} editable={false}/>
            )}
            </ListItem>
            <KeyboardAwareScrollView enableOnAndroid={true} style={{width:'100%'}}>
            <ListItem>
            <Left style={{flex:1}}>
              <Text>Current Pincode</Text>
            </Left>
            <Input value={current_pin} editable={this.state.value}
                onChangeText={(text)=>this.current_handler(text)}
                keyboardType = 'numeric' maxLength={6}/>
            </ListItem>
            </KeyboardAwareScrollView>
            {this.state.showcurrent && this.state.pincodeData && this.state.pincodeData.length > 0 ?(

               
                 <FlatList style={{paddingVertical: 10,paddingBottom:20,height:300}}
                 scrollEnabled={true}
                 keyExtractor={(item)=>{
                 return item.Name;
                 }}              
                 data={this.state.pincodeData}

                 renderItem={({item})=>

                 <Card style={{marginRight:5,marginLeft:5,marginTop:3}} >
                 <CardItem button onPress={()=>this.selectedHomePincode(item)}>
                 <Icon active name="md-locate" />
                 <View style={{flexDirection:'column'}}>
                 <Text>{item.Name}</Text>
                 <Text note>{item.Taluk} , {item.District}</Text>
                 <Text note>{item.State}</Text>
                 </View>
                 </CardItem>
                 </Card>
                 }/>
                ):(<View></View>)}
            
            <ListItem>
            <Left style={{flex:1}}>
              <Text>Current Address</Text>
            </Left>
            <Input placeholder={cvillage+", "+ctaluka
               +", "+cdistrict+", "+cstate} editable={false}/>
            </ListItem>
              
           
            <ListItem>
            <Left style={{flex:1}}>
              <Text>Home Pincode</Text>
            </Left>
              <Input value={home_pin} editable={info.value}
                  onChangeText={(text)=>this.home_handler(text)}
                  keyboardType = 'numeric' maxLength={6}/>
            </ListItem> 
            
            {this.state.showhome && this.state.pincodeData && this.state.pincodeData.length > 0 ?(

                  <FlatList style={{paddingVertical: 10,paddingBottom:20,height:300}}
                  scrollEnabled={true}
                  keyExtractor={(item)=>{
                  return item.Name;
                  }}              
                  data={this.state.pincodeData}

                  renderItem={({item})=>

                  <Card style={{marginRight:5,marginLeft:5,marginTop:3}} >
                  <CardItem button onPress={()=>this.selectedHomePincode(item)}>
                  <Icon active name="md-locate" />
                  <View style={{flexDirection:'column'}}>
                  <Text>{item.Name}</Text>
                  <Text note>{item.Taluk} , {item.District}</Text>
                  <Text note>{item.State}</Text>
                  </View>
                  </CardItem>
                  </Card>
                  }/>
                ):(<View></View>)}

            <ListItem>

            <Left style={{flex:1}}>
              <Text>Home Address</Text>
            </Left>
            <Input placeholder={hvillage+", "+htaluka
               +", "+hdistrict+", "+hstate} editable={false}/>
            </ListItem>
           
          </View>
        <View style={{flexDirection:'row',flex:1}}>
         <View style={{flex:1}}>
          <Button rounded onPress={this.handleEditClick.bind(this)}
          style={{alignSelf:"center",width:'80%',justifyContent:'center',alignItems:'center'}}>
          <Text style={{textAlign:'center'}}>Edit</Text>
          </Button>
          </View>
          <View style={{flex:1}}>
          <Button rounded onPress={this.handleSaveClick.bind(this)} editable={this.state.value} 
                style={{alignSelf:"center",width:'80%',justifyContent:'center',alignItems:'center'}}>
              <Text style={{textAlign:'center'}}>Save</Text>
            </Button>
            </View>
       </View>
       <View style={{marginTop:10}}></View>

          </KeyboardAwareScrollView>
 
        </Content>
      </Container>
      </StyleProvider>
    )
  }
}

