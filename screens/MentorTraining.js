import React, { Component } from 'react';
import MentorCard from './MentorCard';
import {  AsyncStorage, View ,ActivityIndicator,ScrollView,RefreshControl,Alert } from 'react-native';
import { Fab,Icon, Text } from 'native-base';
import {AddMentor,ViewTraining} from '../assets/ApiUrl';
import {NextButton,ButtonText,ScreenTitle,FlexColumn} from '../utils/styles';
import {LinearGradient} from "expo";
import { List } from 'react-native-elements';



export default class MyRequests extends Component{
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      records:{},
      flag:false,
      user_id:"",
      mentor:"",
      loading:false
    };
  }
  componentDidMount(){
    this._retrieveData()
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('mentor');
      const value1=await AsyncStorage.getItem('user_id');
      await this.setState({mentor:value,user_id:value1});
      this.ViewTrainingApi()

      console.log("mentor ",value," id",value1);
    
     } catch (error) {
       console.log(error)
     }
  }

  AddMentorApi = () => {
    console.log("In AddMentor")
    this.setState({loading:true})
    fetch(AddMentor, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          userId:this.state.user_id
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        //console.log("MyfeedApi Response", data)

        if (data.message == "mentor done") {
          console.log("Success")
          // console.log(data.imageData)
          // console.log(data.imageData.filter((image)=>{return image.feedCount==="10" ;})

          this.setState({mentor:'yes',loading:false})
          this._setStorage()
        } else if (data.message) {
          Alert.alert(data.message)
        }
      }).catch((error)=>{
    console.log("Api call error");
    console.log(error.message);
 });
}
  _setStorage=async()=>{
        await AsyncStorage.setItem("mentor","yes");
    }

    ViewTrainingApi = () => {
        console.log("In ViewTraining")
        this.setState({loading:true})
        fetch(ViewTraining, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              mid:this.state.user_id
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            //console.log("MyfeedApi Response", data)
    
            if (data.message == "trainings") {
              console.log("Success")
              
              this.setState({list:data.records.reverse(),loading:false})
            } else if (data.message) {
              Alert.alert(data.message)
            }
          }).catch((error)=>{
        console.log("Api call error");
        console.log(error.message);
     });
    }  
    

  
  render(){
      if(this.state.mentor=='no'){
    return(
      
    <View>

       {this.state.loading && <ActivityIndicator size="large" />}


    <NextButton 
    
     style={{alignSelf: 'center',marginTop: 10, }} 
     onPress={()=>this.AddMentorApi()}
     >
     <LinearGradient
           colors={["#3F51B5", "#3F51B6"]}
           start={{ x: 0.0, y: 1.0 }}
           end={{ x: 1.0, y: 0.0 }}
           style={{ width: "100%", height: "100%",borderRadius:10,paddingLeft: 5,paddingRight: 5,}}
         >

       <ButtonText>Offer Mentorship</ButtonText>
    </LinearGradient>
   </NextButton>
   </View> 
      
    );}

    else{
        
        
        return(
           <View style={{flex:1}}>
            <ScrollView >
          <List>            
            
            {this.state.list && this.state.list.length>0?
                 this.state.list.map((item,index)=>{
                     return (
                        <MentorCard 
                        status={item.status}
                        action={item.action}
                        time={item.time}
                        date={item.date}
                        key={index}
                        name={item.name}
                        prof={item.professional}
                        mob={item.mobile_no}
                        avatar={item.avatar}
                    
                        isMentor={true}
                        train_id={item.id}
                        update={this.ViewTrainingApi}
                        />)
                       
                 }):(
                <View style={{flex: 1,}}>
                <Text style={{textAlign:'center'}}>Congratulations!You are a Mentor! </Text>
                <Text style={{textAlign:'center'}}>Your student requests will appear here </Text>
            </View>
            )}

            </List>
            </ScrollView>
            </View>
          
       );
    }
  }
}