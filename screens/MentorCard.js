import React, { Component } from 'react';
import { Image ,Dimensions ,View,StyleSheet,Alert} from 'react-native';
import { CardItem, Thumbnail, Text, Button, Left, Right , Body  } from 'native-base';
import styled from "styled-components";
import {UpdateTraining} from '../assets/ApiUrl';
import { FlexColumn } from './VideoCard';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicon from 'react-native-vector-icons/Octicons';


export default class MentorCard extends Component {

    state={
      action:"",
      status:"approved",
      trainId:""      
    }

  
    componentDidMount(){
      if(this.props.action=='call'){
        this.setState({action:"CALL"})
      }
      else{
        this.setState({action:"VISIT"})
      }
    }

  updateTrainingApi = (value) => {
    console.log("In updateTraining")
    this.setState({loading:true})
    fetch(UpdateTraining, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trainId:this.props.train_id,
        status:value
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("updateTraining Response", data)

        if (data.message == "Training Updated") {
          console.log("Success")
          this.props.update()
          
        } else if (data.message) {
          Alert.alert(data.message)
        }
      }).catch((error)=>{
    console.log("Api call error");
    console.log(error.message);
 });
}  


    
  render() {
    return (
        <View>
        
          {this.props.status=='approved' && <Card style={{backgroundColor:'#00AA8A'}}>
            <CardItem >
              <Left>
                <Thumbnail source={{uri:this.props.avatar}} />
                <Body>
                  <Text>{this.props.name}</Text>
                  <Text note>{this.props.prof}</Text>
                </Body>
              </Left>
              <Right>
                    <View style={{flexDirection: 'column',justifyContent:'center',alignItems: 'center',}}>
                    <Octicon size={30} name="verified" />
                    <Text note>Approved</Text>
                    </View>
              </Right>
            
              </CardItem>

            
            <FlexColumn style={{justifyContent:"center",alignItems: 'center',}}> 
            <NameText>
                 {this.state.action}
            </NameText> 
            <NameText>
                   Date:- {this.props.date}
            </NameText>
            <NameText>
                   Time:- {this.props.time}
            </NameText>
            </FlexColumn>
            <CardItem>
            </CardItem>
          </Card>}






           {this.props.status=='pending' &&  <Card style={{backgroundColor:'yellow'}}>
           <CardItem >
             <Left>
             <Thumbnail source={{uri:this.props.avatar}} />
                <Body>
                  <Text>{this.props.name}</Text>
                  <Text note>{this.props.prof}</Text>
               </Body>
             </Left>
             <Right>
                   <View style={{flexDirection: 'column',justifyContent:'center',alignItems: 'center',}}>
                   <MaterialIcon size={30} name="access-time" />
                   <Text note>Wating for Approval</Text>
                   </View>
             </Right>
           
             </CardItem>

           
           <FlexColumn style={{justifyContent:"center",alignItems: 'center',}}>
           <NameText>
                 {this.state.action}
          </NameText>  
          <NameText>
                   Date:- {this.props.date}
            </NameText>
            <NameText>
                   Time:- {this.props.time}
            </NameText>
           </FlexColumn>
           

           


           <CardItem>
               {this.props.isMentor && 
               <View style={{flexDirection: 'row',}}>
           
                <Button transparent textStyle={{color: '#87838B'}} style={{borderWidth: 1,flex:1}}
                onPress={()=>this.updateTrainingApi('cancel')}>
                 
                  <Text style={{textAlign:"center"}}>Cancel</Text>
                </Button>
                <View style={{flex:.1}}></View>
             

              
                <Button transparent textStyle={{color: '#87838B'}} style={{borderWidth: 1,flex:1}}
                onPress={()=>this.updateTrainingApi('approved')}>
                  <Text>Approve</Text>
                </Button>
                </View>}
           </CardItem>
         </Card>
         
        }



         {this.props.status=='cancel' &&  <Card style={{backgroundColor:'#ff1a1a'}}>
          <CardItem >
            <Left>
            <Thumbnail source={{uri:this.props.avatar}} />
                <Body>
                  <Text>{this.props.name}</Text>
                  <Text note>{this.props.prof}</Text>
                <Text note>Profession</Text>
              </Body>
            </Left>
            <Right>
                  <View style={{flexDirection: 'column',justifyContent:'center',alignItems: 'center',}}>
                  <MaterialIcon size={30} name="cancel" />
                  <Text note>Cancelled</Text>
                  </View>
            </Right>
          
            </CardItem>

          
          <FlexColumn style={{justifyContent:"center",alignItems: 'center',}}>
          <NameText>
                 {this.state.action}
          </NameText>  
          <NameText>
                   Date:- {this.props.date}
            </NameText>
            <NameText>
                   Time:- {this.props.time}
            </NameText>
          </FlexColumn>
          

          


          <CardItem>
             

          </CardItem>
        </Card>}

        </View>
    );
  }
}

const Card = styled.View`
elevation:4;
margin-top:14px;
margin-left:14px;
margin-right:14px;
border-radius: 8px;
  `

  const NameText=styled.Text`
  height: 22px;
  font-size: 17px;
  font-weight: 600;
  font-style: normal;
  color: rgba(3, 15, 41, 0.9);`