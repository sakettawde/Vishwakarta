import React from 'react';
import { StatusBar,  View ,Alert } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label , Button ,DatePicker, Text, Left, Right 
, Radio, Picker,Icon} from 'native-base';
//import Dialog from "react-native-dialog";
import { ListGotra ,ListProf} from "../assets/ApiUrl";

import {NextButton,ButtonText ,FlexColumn,ScreenTitle} from "../utils/styles";
import { LinearGradient } from "expo";


export default class SignUp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      chosenDate: new Date(),
      isSelect1: true,
      isSelect2: false,
      selected_prof: 1,
      prof_name:"",
      gotra_name:"",
      selected_gotra: 1,
      name:"",
      mobile_num:"",
      password:"",
      toggle:"",
      profession:"",
      gotra:"",
      gotralist:[ {
           "gotra": "Select",
           "id": 0,
        },
        {
          "gotra": "Select",
          "id": 1,
       },
      ],
      proflist:[ {
        "name": "Select",
        "id": 0,
     },
     {
       "name": "Select",
       "id": 1,
    },
   ],

     };
    this.setDate = this.setDate.bind(this);

  }
  
  

    componentDidMount(){
      this.gotra_renderer()    
      this.prof_renderer()  
     
    }
  


  fillinfo=()=>{
    if(!this.state.name.length){
      Alert.alert("Please Enter Your Name")
      return
    }
    if(!this.state.mobile_num.length || this.state.mobile_num.length < 10 ){
      Alert.alert("Please Enter Valid Number")
      return
    }
    if(this.state.password.length < 5 ){
      Alert.alert("Password cannot be less than 5 characters")
      return
    } 
    console.log(this.state.name)
    console.log(this.state.mobile_num)
    console.log(this.state.password)
    console.log(this.state.chosenDate.toString().substr(4, 12))
    console.log(this.state.isSelect1)
    console.log(this.state.prof_name)
    console.log(this.state.gotra_name)

   

    // this._storeData()

    this.props.navigation.navigate ('SignupScreen2',{
      name:this.state.name,
      mobile_num :this.state.mobile_num,
      password:this.state.password,
      birthdate: this.state.chosenDate.toString().substr(4,12),
      toggle:this.state.isSelect1.toString(),
      profession:this.state.prof_name,
      gotra:this.state.gotra_name
    })
  
  }


  _onPressHandle = () => {
    this.setState({isSelect1: !this.state.isSelect1, isSelect2 : !this.state.isSelect2})
  }
  
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
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
  addGotraHandler=()=>{
    
    this.props.navigation.navigate('AddGotra', {updateGotra: this.gotra_renderer})
    
  }
  addProfHandler=()=>{
    
    this.props.navigation.navigate('AddProf', {updateProf: this.prof_renderer})
    
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
          this.setState({selected_gotra:this.state.gotralist[this.state.gotralist.length-1].id})
          var temp=this.state.gotralist.find((item)=>{
            return item.id ===this.state.selected_gotra
          })
          //console.log(temp)
          this.setState({
            gotra_name: temp.gotra
          });
          //console.log(this.state.records)
          //console.log(data.records)                  
          //console.log(this.state.gotralist.length)            
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
          this.setState({selected_prof:this.state.proflist[this.state.proflist.length-1].id})
          var temp=this.state.proflist.find((item)=>{
            return item.id ===this.state.selected_prof
          })
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
  
 
  render() {
    return (
      <FlexColumn style={{flex:1,margin:10,marginTop: StatusBar.currentHeight}}>
        <ScreenTitle>SignUp</ScreenTitle>

        <FlexColumn>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input autoCapitalize="words" onChangeText={text=>{this.setState({name:text})}}/>
            </Item>
            <Item stackedLabel >
              <Label>Mobile Number</Label>
              <Input onChangeText={text=>{this.setState({mobile_num:text})}}
                    keyboardType = 'numeric' maxLength={10} />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input  secureTextEntry={true} onChangeText={text=>{this.setState({password:text})}}/>
            </Item>
            <Item stackedLabel>
                <Label>BirthDate</Label>
              
                <DatePicker
                  defaultDate={new Date(1996, 1, 1)}
                  minimumDate={new Date(1975, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  //placeHolderText={this.state.chosenDate.toString().substr(4, 12)}
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={text=>this.setState({chosenDate:text})}
                  
                  />
                  
            </Item>

            
            <Item>
              <View style={{flexDirection:'row',justifyContent:"space-evenly",padding:10}}>
                <View style={{flex:5,flexDirection:"row"}}><Left>
                  
                  <Radio selected={this.state.isSelect1} onPress={this._onPressHandle}/>
                
                </Left>
                <Right>
                  <Text>Business</Text>
                </Right>
                </View>
                <View style={{flex:1}}></View>
                <View style={{flex:5,flexDirection:"row"}}>
                  <Left>
                    
                    <Radio selected={this.state.isSelect2} onPress={this._onPressHandle}/>
                  
                  </Left>
                  <Right>
                   <Text>Employed</Text>
                  </Right>
                </View>
              </View>
              
            </Item>
            


            <Item>
            <Text>Profession</Text>
            <Picker
              style={{borderWidth: 1 ,borderColor:'#A9A9A9'}}
              mode="dropdown"
              Icon={<Icon name="ios-arrow-down-outline" />}
              selectedValue={this.state.selected_prof}
              onValueChange={this.onProfChange.bind(this)}
            >

              {this.state.proflist.map(item => (
                <Picker.Item key={item.id} label={item.name} value={item.id}></Picker.Item>
               ))}
            </Picker>
            

            <Button iconLeft light onPress={()=>this.addProfHandler()}>
            <Icon name='md-add' />
            <Text>Other</Text>
          </Button>
          </Item>


            <Item>
            <Text>Gotra</Text>
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
            

            <Button iconLeft light onPress={()=>this.addGotraHandler()}>
            <Icon name='md-add' />
            <Text>Other</Text>
          </Button>
          </Item>
          
            
            
            
          </Form>

          

          <NextButton 
          onPress={this.fillinfo}
          style={{marginTop: 10,}}  
          >
          <LinearGradient
                colors={["#7c98fd", "#4e43f9"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                style={{ width: "100%", height: "100%",borderRadius:10}}
              >

            <ButtonText>Next</ButtonText>
          </LinearGradient>
        </NextButton>


        </FlexColumn>
        
      </FlexColumn>
    
      
    );
  }
}


