import React from 'react';
import { StyleSheet,  View, ScrollView,Alert ,Dimensions, TouchableOpacity } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label , Button, Text, Left, Right,Image, Picker,Icon, List, ListItem} from 'native-base';
import { ImagePicker } from 'expo';
//import Table from 'react-native-simple-table'
//import { Table, Row, Rows } from 'react-native-table-component';

import { Signup , PincodeUrl } from "../assets/ApiUrl";





export default class SignupScreen2 extends React.Component{
 
  state = {
    image: null,
    home_pin: "",
    current_pin: "",
    showhome:false,
    showcurrent:false,
    pincodeData:[],
    

  };
  info_array={
    name:"",
    mobile_num:"",
    password:"",
    birthdate:"",
    toggle:"",
    profession:"",
    gotra:""
}


  check_func=()=>{
    console.log("Code here")
    console.log(this.info_array)
    this.SignupApi();
    
  }


  
 

  SignupApi = () =>{

    if(this.state.home.length < 5){
      Alert.alert("Enter Valid Pincode")
      return
    }
    if(this.state.current.length < 5){
      Alert.alert("Enter Valid Pincode")
      return
    }

    console.log("In SignupApi")
    fetch(Signup, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name:this.info_array.name,
        mobile_no: this.info_array.mobile_num,
        password: this.info_array.password,
        dob:this.info_array.birthdate,
        status:this.info_array.toggle,
        professional:this.info_array.profession,
        home_pincode:this.state.home,
        current_pincode:this.state.current,
        gotra:this.info_array.gotra
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("Signup Response", data)
        if(data.message=="Registration succesfully "){
          this.props.navigation.navigate('Drawer')
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
    // componentDidMount(){
    //   this._retrieveData()
    // }

    
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
     
      console.log("data of pincode",data.record.PostOffice)
      console.log(pin)
      this.setState({pincodeData:data.record.PostOffice})
          if(data.record.PostOffice){
            console.log("data is available")
          }else{
            console.log("No User")
            this.setState({pincodeData:[]})
          }
    })
  }


home_handler=(text)=>{
  this.setState({home_pin:text})
  console.log(text)
  if(text.length < 6){
    this.setState({pincodeData:[]})
  }
  else{
  this.pincodeApi(text)
  this.setState({showhome:true})
  }



}

onHomeChange=(value)=>{
  this.setState({selected_home:value})
  //this.setState({showhome:false})
}
selectedPincode=(item)=>{
  console.log('in onPress')
  console.log(item)
  this.setState({showhome:false})

}

    render() {
        let { image }=this.state;
        this.info_array.name = this.props.navigation.getParam('name', '');
        this.info_array.mobile_num = this.props.navigation.getParam('mobile_num', '');
        this.info_array.birthdate = this.props.navigation.getParam('birthdate', '');
        const value = this.props.navigation.getParam('toggle', '');
        if (value=='true'){
          this.info_array.toggle="Business"
        }
        else{
          this.info_array.toggle="Employee"
        }

        this.info_array.profession = this.props.navigation.getParam('profession', '');
        this.info_array.gotra = this.props.navigation.getParam('gotra', '');
        

        return (
          <Container>
            <Header ><Text>SignUp </Text></Header>
            <Content>
              <Form>
              <Item stackedLabel>
              <Label>Home Location Pincode</Label>
              <Input onChangeText={(text)=>this.home_handler(text)}
                    keyboardType = 'numeric' maxLength={6} />
            </Item>

          {this.state.showhome && this.state.pincodeData && this.state.pincodeData.length > 0 ?(

            <ScrollView >
            <List>
              <ListItem itemHeader style={{flexDirection:"row",justifyContent:"space-evenly"}}  >
                  <Text>Name</Text>
                  <Text>District</Text>
                  <Text>Region</Text>
                  <Text>Country</Text>
              </ListItem>

              {this.state.pincodeData.map((item,index)=>(
                      <ListItem key={index} style={{flexDirection:"row",justifyContent:"space-evenly"}} >
                      {/* <TouchableOpacity onPress={this.selectedPincode(item)} >
                        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                          <View><Text>{item.Name}</Text></View>
                          <View><Text>{item.District}</Text></View>
                          <View><Text>{item.Region}</Text></View>
                          <View><Text>{item.Country}</Text></View>
                        </View>
                      </TouchableOpacity> */}
                      <TouchableOpacity onPress={()=>this.selectedPincode(item)}><Text>{item.Name}</Text></TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.selectedPincode(item)}><Text>{item.District}</Text></TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.selectedPincode(item)}><Text>{item.Region}</Text></TouchableOpacity>
                      <TouchableOpacity onPress={()=>this.selectedPincode(item)}><Text>{item.Country}</Text></TouchableOpacity>
                      </ListItem>
              ))}
            </List>
            </ScrollView>
          ):(<View></View>)}

         {/* {this.state.pincodeData && this.state.pincodeData.length > 0 ?( <View style={styles.container}>
        <Table columnWidth={70} columns={columns} dataSource={this.state.pincodeData}/>
         </View>):(<View></View>)
         } */}

         


            {/* {this.state.pincodeData && this.state.pincodeData.length > 0 ?(
              <View style={{flex : 1,}} >
            <Table columns={columns} dataSource={this.state.pincodeData}
           
            style={{flex:1,width:Dimensions.get('window').width}} />
            </View>
            ):(<View></View> )} */}


            {/* <View style={styles.container}>
              <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                
                { this.state.pincodeData? (
                <Row data={this.state.tableHead} /> 
                <Rows data={['1','2','5','6']} />
                  )
                :(<View></View>)}
              </Table>
            </View>           */}

            {/* {this.state.pincodeData && this.state.pincodeData.length > 0 ?(
          <View style={{display:"flex",flexDirection:"column"}}>
          {this.state.pincodeData.map(item=>{
            <TouchableOpacity>
            <View style={{display:"flex",flexDirection:"row"}}>
            <Text>{item.Name}-{item.District}-{item.Region}</Text>
            </View>
            </TouchableOpacity>
          })}
          </View>
         ):(<View></View>)
         } */}



           
           



            
            <Item stackedLabel >
              <Label>Current Location Pincode</Label>
              <Input onChangeText={(text)=>this.setState({current_pin:text})}
                  keyboardType = 'numeric' maxLength={6}/>
            </Item>
            <Item stackedLabel Last>
              <Label>Profile Picture</Label>
              
              <Right>
              <Button onPress={this._pickImage}><Text>Upload</Text></Button>
              </Right>
              {image && <Text>Uploaded</Text>}
            </Item>
          </Form>

          

            <Button rounded full
            onPress={() => this.check_func()}>
            <Text style={{ color: 'white' }}>SignUp</Text>
        </Button>
            </Content>
          </Container>
        
          
        );
      }
      _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          base64:true,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      };
}

 const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});