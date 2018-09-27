import React from 'react';
import { StyleSheet, Text, Switch ,View,Alert,TimePickerAndroid,AsyncStorage} from 'react-native';
import {  Form, Item ,Input, Label, Left, Right, DatePicker, Button } from 'native-base';
import {NextButton,ButtonText ,FlexColumn, FlexRow} from "../utils/styles";
import {LinearGradient} from 'expo';
import {AddTraining} from '../assets/ApiUrl';


export default class MentorTime extends React.Component {
  state={
   sid:"",
   name:"",
   date: new Date(),
   time:"",
   info:"",
   show:false,
   mid:"",
   request_amount:false,
   amount:0,
   mentor_name:"",
   mentor_mob:""
  }


  componentDidMount(){
    this._retrieveData()
    let temp=this.props.navigation.getParam('info','no_info');
    console.log(temp);
    
    const mid=this.props.navigation.getParam('mid','no_info');
    console.log("mid ",mid);

    let val1=this.props.navigation.getParam('name');
    
    let val2=this.props.navigation.getParam('mob');
    console.log("val1 ",val1," val2",val2);
    


    if(temp=='visit'){
        this.setState({show:true,info:temp,mid:mid,mentor_name:val1,mentor_mob:val2});
    }
    else{
      this.setState({info:temp,mid:mid,mentor_name:val1,mentor_mob:val2});
    }
  }
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('user_id');
      const value2 = await AsyncStorage.getItem('user_name');
      console.log("userid ",value," name",value2);
      this.setState({sid:value,name:value2});
     } catch (error) {
       console.log(error)
     }
  }
  addTrainingApi = () =>{
    console.log("In addTrainingApi")
    fetch(AddTraining, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mid:this.state.mid,
        sid:this.state.sid,
        date:this.state.date.toString().substr(4,12),
        time:this.state.time,
        action:this.state.info,
        amount:this.state.amount

      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("AddTraining Response", data)
        if(data.message=="Training Requested"){
             
          this.sendMessageRequest()
          this.props.navigation.navigate('MentorStudent')
                  
        }
        else {
          Alert.alert(data.message)
        }
          
      })
      .catch((error)=>{
        console.log("Api call error");
        console.log(error.message);
     });
  
    }
    sendMessageRequest = () => {
  
     
      let Inquirymsg = "Hi "+this.state.mentor_name+","+this.state.name+" has requested an "+
              this.state.info+" with you at "+this.state.time+" on "+this.state.date.toString().substr(4,12)
    
      console.log(Inquirymsg)
      let authkey = "226898AmIKM4WBH5b502d68"
      let sender = "MSGIND"
      let route = "4"
      let number = this.state.mentor_mob
      let urlInquiry='http://control.msg91.com/api/sendhttp.php?authkey='+authkey+'&mobiles='+number+'&message='+Inquirymsg+'&sender='+sender+'&route='+route+'&country=91';
    
    
      fetch(urlInquiry, { mode: "no-cors" }).then(response => {
        console.log("Message Sent")
      })
    }


    pickTime=async()=>{
        let temp=""
        try {
            const {action, hour, minute} = await TimePickerAndroid.open({
              hour: 14,
              minute: 0,
              is24Hour: false, // Will display '2 PM'
              mode:"default"
            });
            if (action !== TimePickerAndroid.dismissedAction) {
              // Selected hour (0-23), minute (0-59)
              console.log(hour)
              console.log(minute)
              if(minute<10){
                minute="0"+minute
              }
              if(hour>=12){
                hour=hour-12;
                temp=hour+":"+minute+" pm"
              }
              else{
                temp=hour+":"+minute+" am"
              }
              console.log(temp)
              this.setState({time:temp})
            }
          } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
          }
    }
    

  render() {
    

    return (
      <FlexColumn >
        {/* <Header ><Text style={styles.headline}>Add New Gotra</Text></Header> */}
        
          <Form>
            <Item stackedLabel>
              <Label>Select a Date</Label>
              
              {/* <Input value={this.state.date.toString().substr(4, 12)} /> */}
             
              <DatePicker
                  defaultDate={new Date()}
                  minimumDate={new Date()}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Select Date"
                  //textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={text=>{
                    this.setState({date:text})
                    console.log(text.toString().substr(4,12))
                  }}
                  
                  />
             
            </Item>

            <Item stackedLabel>
              <Label>Select Time</Label>
              
              <Button light onPress={()=>this.pickTime()} style={{alignSelf:"center",width: 90
              ,justifyContent:'center',alignItems:'center'}}>

              {this.state.time?(<Text style={{textAlign:"center"}}>{this.state.time}</Text>)
              :(<Text style={{textAlign:"center"}}>Select Time</Text>)}
              
              </Button>
               
            </Item>

            {this.state.show && <FlexRow style={{justifyContent: 'space-around',margin:5}}>
            <View></View>
            <Text>Request for visit fund to admin</Text>
            <Switch  onValueChange={() => {this.setState({request_amount:!this.state.request_amount})}} 
             value={this.state.request_amount}/>
            <View></View>
            </FlexRow>}

            {this.state.request_amount &&  <Item stackedLabel>
              <Label>Enter Amount</Label>
              <Input onChangeText={(text)=>{this.setState({amount:text})}} 
                    keyboardType = 'numeric' maxLength={10}/>
            </Item>
        }
           
          </Form>

          <NextButton 
          style={{marginTop: 10,}}  
          onPress={()=>this.addTrainingApi()}
          >
          <LinearGradient
               colors={["#00aa8a", "#00b392"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                style={{ width: "100%", height: "100%",borderRadius:10}}
              >

            <ButtonText>Add</ButtonText>
          </LinearGradient>
        </NextButton>
       
      </FlexColumn>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline:{
    fontSize: 25,
    color: 'white'
  }
});
