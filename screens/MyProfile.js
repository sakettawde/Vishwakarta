import React from 'react';
import {
  ScrollView,
  View,AsyncStorage,
  StatusBar,
  Image,Alert,TouchableOpacity
} from 'react-native';
import {Text , Label , Left ,Right ,Container, Header, Content, List, ListItem,Title, Input, Button 
      , DatePicker,Picker,Icon} from 'native-base';
import { Userinfo ,ListGotra ,ListProf ,PincodeUrl,EditUrl} from "../assets/ApiUrl";


export default class ProfileSettings extends React.Component {
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
    this.UserInfoApi()
   } catch (error) {
     console.log(error)
   }
}

componentDidMount(){
  this._retrieveData()
  

}

UserInfoApi = () =>{
  console.log("In UserInfoApi")
  fetch(Userinfo, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id:this.state.user_id
    })
  })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log("UserInfo Response", data)
      if(data.message=="Data available"){
        this.setState({records:data.records})

        this.setState({
          name:data.records[0].name,
        mobile_num:data.records[0].mobile_no,
        password:data.records[0].password,
        chosenDate:data.records[0].dob,
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
            return item.gotra ===this.state.records[0].gotra
          })
          //console.log(temp)
          this.setState({
            selected_gotra: temp.id
          });
          this.setState({
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
            return item.name ===this.state.records[0].professional
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
  this.setState({hvillage:item.Name})
  this.setState({htaluka:item.Taluk})
  this.setState({hdistrict:item.District})
  this.setState({hstate:item.State})
  this.setState({showhome:false})
}

current_handler=(text)=>{
  this.setState({current_pin:text})
 // console.log(text)
  if(text.length < 6){
    this.setState({pincodeData:[]})
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
    
    return (
      <Container style={{marginTop:StatusBar.currentHeight}}>
        {/* <Header /> */}
        <Content>
          <Image source={{uri:"https://res.cloudinary.com/jerrick/image/upload/f_auto,fl_progressive,q_auto,c_fit,w_1100/t3onxzmjhmfbbah9ahzi" }} 
          style={{height: 200, alignSelf: "stretch", flex: 1}}/>
          <Text>Info</Text>
          <List>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Name</Text>
            </Left>
              <Input value={this.state.name} editable={this.state.value} 
                    onChangeText={(text)=>{this.setState({name : text})}}/>
            </ListItem>

             <ListItem>
            <Left style={{flex:1}}>
              <Text>Contact</Text>
            </Left>
              <Input value={this.state.mobile_num} editable={this.state.value}
                      onChangeText={(text)=>{this.setState({mobile_num : text})}}
                      keyboardType="numeric" maxLength={10}/>
            </ListItem>

            {this.state.value && 
            <ListItem>
              <Left>
              <Text>Password</Text>
            </Left>
              <Input value={this.state.password} 
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
               placeHolderText={this.state.records[0].dob.toString().substr(4, 12)}
               textStyle={{ color: "green" }}
               placeHolderTextStyle={{ color: "#d3d3d3" }}
               onDateChange={text=>this.setState({chosenDate:text})}
               
               />
               
            ):(
              <Input placeholder={this.state.records[0].dob} editable={false}/>
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
              <Input placeholder={this.state.records[0].professional} editable={false}/>
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
              <Input placeholder={this.state.records[0].gotra} editable={false}/>
            )}
            </ListItem>

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Current Pincode</Text>
            </Left>
            <Input value={this.state.records[0].current_pincode} editable={this.state.value}
                onChangeText={(text)=>this.current_handler(text)}
                keyboardType = 'numeric' maxLength={6}/>
            </ListItem>
            {this.state.showcurrent && this.state.pincodeData && this.state.pincodeData.length > 0 ?(

                <ScrollView >
                <List>
                  <ListItem itemHeader style={{flexDirection:"row",justifyContent:"space-evenly"}}  >
                      <Text>Name</Text>
                      <Text>Taluka</Text>
                      <Text>District</Text>
                      <Text>State</Text>
                  </ListItem>

                  {this.state.pincodeData.map((item,index)=>(
                          <ListItem key={index} style={{flexDirection:"row",justifyContent:"space-evenly"}} >
                          
                            <TouchableOpacity onPress={()=>this.selectedCurrentPincode(item)}><Text>{item.Name}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.selectedCurrentPincode(item)}><Text>{item.Taluk}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.selectedCurrentPincode(item)}><Text>{item.District}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.selectedCurrentPincode(item)}><Text>{item.State}</Text></TouchableOpacity>
                          </ListItem>
                  ))}
                </List>
                </ScrollView> 
                ):(<View></View>)}
            
            <ListItem>
            <Left style={{flex:1}}>
              <Text>Current Address</Text>
            </Left>
            <Input placeholder={this.state.cvillage+", "+this.state.ctaluka
               +", "+this.state.cdistrict+", "+this.state.cstate} editable={false}/>
            </ListItem>
              

            <ListItem>
            <Left style={{flex:1}}>
              <Text>Home Pincode</Text>
            </Left>
              <Input value={this.state.records[0].home_pincode} editable={this.state.value}
                  onChangeText={(text)=>this.home_handler(text)}
                  keyboardType = 'numeric' maxLength={6}/>
            </ListItem> 
            {this.state.showhome && this.state.pincodeData && this.state.pincodeData.length > 0 ?(

                <ScrollView >
                <List>
                  <ListItem itemHeader style={{flexDirection:"row",justifyContent:"space-evenly"}}  >
                      <Text>Name</Text>
                      <Text>Taluka</Text>
                      <Text>District</Text>
                      <Text>State</Text>
                  </ListItem>

                  {this.state.pincodeData.map((item,index)=>(
                          <ListItem key={index} style={{flexDirection:"row",justifyContent:"space-evenly"}} >
                          
                          <TouchableOpacity onPress={()=>this.selectedHomePincode(item)}><Text>{item.Name}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.selectedHomePincode(item)}><Text>{item.Taluk}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.selectedHomePincode(item)}><Text>{item.District}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.selectedHomePincode(item)}><Text>{item.State}</Text></TouchableOpacity>
                          </ListItem>
                  ))}
                </List>
                </ScrollView>
                ):(<View></View>)}

            <ListItem>

            <Left style={{flex:1}}>
              <Text>Home Address</Text>
            </Left>
            <Input placeholder={this.state.hvillage+", "+this.state.htaluka
               +", "+this.state.hdistrict+", "+this.state.hstate} editable={false}/>
            </ListItem>
           
          </List>
        <View style={{flexDirection:'row'}}>
         <Left>
          <Button onPress={this.handleEditClick.bind(this)}><Text>Edit</Text></Button>
          </Left>
          <Right>
          <Button onPress={this.handleSaveClick.bind(this)} editable={this.state.value} >
              <Text>Save</Text>
            </Button>
            </Right>
       </View>

          
 
        </Content>
      </Container>
    )
  }
}
