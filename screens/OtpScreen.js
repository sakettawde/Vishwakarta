import React from 'react';
import { StyleSheet, Text, View ,Alert} from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label } from 'native-base';
import { UpdateOtp,CheckOtp } from "../assets/ApiUrl";


export default class OtpScreen extends React.Component {
  state={
    mobile_num:"",
    otp:""
  }

  reset = () => {
    //this.close()
    //this.setState({ size1, open1: true })

    let random
    let max = 1000
    let min = 9000
    random = Math.floor(Math.random() * (max - min + 1)) + min
    console.log(random)

    // let authkey = "133779ATT6JFXy0k5850e783"
    // let sender = "SHMGMT"
    // let route = "4"
    let number = this.state.mobile_no
    let message = "Hey there, here is ur otp :" + random

    let url =
      "http://bhashsms.com/api/sendmsg.php?" +
      "user=TEAM_MHOURZ&pass=MECHATRON&text=" +
      message +
      "&sender=MHOURZ&phone=" +
      number +
      "&priority=ndnd&stype=normal"
    //console.log("url", url)
    fetch(url, { mode: "no-cors" }).then(response => {
      //console.log(response)
      fetch(UpdateOtp, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          u_number: this.state.mobile_num,
          otp: random
        })
      }).then(data => {
        return data.json()
      })
      .then(data => {
        console.log("OtpUpdate Response", data)          
      })
    })
  }

  componentDidMount(){
    this.state.mobile_num = this.props.navigation.getParam('mobile_num');
    this.reset()
    console.log(this.state.mobile_num)
  }


  VerifyOtp = () =>{
    console.log("In VerifyOtp")
    fetch(CheckOtp, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        u_number: this.state.mobile_num,
        otp:this.state.otp
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("Checkotp Response", data)
        if(data.message=="verify OTP"){
          this.props.navigation.navigate('Newpassword',{
            mobile_num:this.state.mob_num
          })
                  
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


  render() {
    

    return (
      <Container>
        <Header ><Text style={styles.headline}>Password Recovery</Text></Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Enter OTP</Label>
              <Input onChangeText={(text)=>{this.setState({otp:text})}}
                  keyboardType = 'numeric' maxLength={4}
              />
            </Item>
            
            <Button rounded full
                onPress={()=>this.VerifyOtp()}>
          <Text style={{ color: 'white' }}>Next</Text>
        </Button>
          </Form>
        </Content>
      </Container>

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
