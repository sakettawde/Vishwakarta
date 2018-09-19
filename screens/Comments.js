import React, { Component } from 'react';
import {  Form, Item,  Label, Icon, Button,  } from 'native-base';
import {StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,} from 'react-native';
import {FlexColumn} from "../utils/styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from "moment";
import {ViewComment,AddComment,ViewMyComment,ViewTempleComment,
        AddTempleComment,AddMyComment} from "../assets/ApiUrl";
 


export default class Comments extends Component {
    state = {
        comment: "",
        tab:"",
        id:4,
        // data:[
        //   {id:1, image: "https://bootdey.com/img/Content/avatar/avatar1.png", name:"Frank Odalthh", time:moment().format(),   comment:"Looks Good."},
        //   {id:2, image: "https://bootdey.com/img/Content/avatar/avatar6.png", name:"John DoeLink", time:moment().format(),    comment:"We can scroll through Comments."},
        //   {id:3, image: "https://bootdey.com/img/Content/avatar/avatar7.png", name:"March SoulLaComa", time:moment().format(), comment:"My avatar is so cool."},
        //   {id:4, image: "https://bootdey.com/img/Content/avatar/avatar2.png", name:"Finn DoRemiFaso",  time:moment().format(),comment:"Wow look at the timestamp, it updates when component renders again."},
        //   ]
        data:[]
      };

      componentDidMount(){
        this.setState({tab:this.props.navigation.getParam('tab')});
        
        
        this.CommentHandler()

      }

      CommentHandler=()=>{
        let temp=this.props.navigation.getParam('tab');
        if(temp=='admin'){
          this.LoadComments(ViewComment)
        }
        else if(temp=='temple'){
          this.LoadComments(ViewTempleComment)
        }
        else if(temp=='my'){
          this.LoadComments(ViewMyComment)
        }
      }

      LoadComments = (link) => {
        
        fetch(link, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            feedId:this.props.navigation.getParam("feedId")
          })
        })
          .then(data => {
            return data.json()
          })
          .then(data => {
            console.log("LoadComments Response", data)
    
            if (data.message == "Commented") {
              console.log("Success")
              // console.log(data.imageData)
              // console.log(data.imageData.filter((image)=>{return image.feedCount==="10" ;}))    
              this.setState({data:data.records})
            } else if (data.message) {
              Alert.alert(data.message)
            }
          }).catch((error)=>{
        console.log("Api call error");
        console.log(error.message);
     });
    }


    AddComment=(link)=>{
      fetch(link, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        feedId:this.props.navigation.getParam("feedId"),
        date:moment().format(),
        comment:this.state.comment,
        userid:this.props.navigation.getParam("userid")
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("LoadComments Response", data)

        if (data.message == "Commented") {
          console.log("Success")
          this.CommentHandler()
        } else if (data.message) {
          Alert.alert(data.message)
        }
      }).catch((error)=>{
    console.log("Api call error");
    console.log(error.message);
 });}
     
      onPostHandler=()=>{
        let temp=this.props.navigation.getParam('tab');
        if(temp=='admin'){
          this.AddComment(AddComment)
        }
        else if(temp=='temple'){
          this.AddComment(AddTempleComment)
        }
        else if(temp=='my'){
          this.AddComment(AddMyComment)
        }   
        
      }
  render() {
    return (
      <FlexColumn style={{flex:1}}>    
       
        
       <FlatList
        style={styles.root}
        data={this.state.data}
        scrollEnabled={true}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;   
          return(
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {console.log(Notification.name)}}>
                <Image style={styles.image} source={{uri: Notification.avatar}}/>
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>{Notification.name}</Text>
                  <Text style={styles.time}>
                  {moment(Notification.date).fromNow()}
                  </Text>
                </View>
                <Text rkType='primary3 mediumLine'>{Notification.comment}</Text>
              </View>
            </View>
          );
        }}/>
       
        <View>
        <KeyboardAwareScrollView enableOnAndroid={true} style={{width:'100%'}}>
        
        <Form>
            <Item>
              {/* <Label>Comment</Label> */}
              <View style={{flexDirection:"row"}}>
                <View style={{flex:4}}>
                    <TextInput underlineColorAndroid='transparent' multiline={true}  clearButtonMode="always"
                    onChangeText={(text)=>{this.setState({comment:text})}} editable={true}
                    style={{width:'100%',textAlign:"left",textAlignVertical:"top",fontSize:18,marginTop:3}}/>
                </View>
                <View style={{flex:1,alignSelf:"flex-end"}}>
                    <Button icon light onPress={() => this.onPostHandler()}>
                    <Icon  active name="md-send" />
                    </Button>
                  </View>
              </View>
            </Item>
          </Form>

        {/* <NextButton 
          onPress={() => this.onPostHandler()}
          style={{marginTop: 10}}  
          >
          <LinearGradient
                colors={["#7c98fd", "#4e43f9"]}
                start={{ x: 0.0, y: 1.0 }}
                end={{ x: 1.0, y: 0.0 }}
                style={{ width: "100%", height: "100%",borderRadius:10}}
              >

            <ButtonText>Post</ButtonText>
          </LinearGradient>
        </NextButton> */}
        </KeyboardAwareScrollView>

        </View>

    
          
        

    
   

        
      </FlexColumn>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop:10,
    marginBottom:10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
});  

