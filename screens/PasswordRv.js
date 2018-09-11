import React from 'react';
import { StyleSheet, Text, View ,Alert,BackHandler} from 'react-native';
import { Header, Form, Button, Container, Content,Item ,Input, Label } from 'native-base';
import { Passrv } from "../assets/ApiUrl";

export default class PasswordRv extends React.Component {

  constructor(props) {
    super(props);
    this.state = { mob_num:"" };
    //this.onBackPress = this.onBackPress.bind(this)
  }
  
  // componentDidMount () {
  //   BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  // }

  // componentWillUnmount () {
  //   BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  // }

  // onBackPress () {
  //   console.log("onBack called")
  //   const { dispatch, nav } = this.props
  //   dispatch(NavigationActions.back())
  //   return nav !== this.props.nav
  // }
  

  PassrvApi = () =>{
    if(this.state.mob_num.length<10){
      Alert.alert("Please Enter Valid Number")
      return
    }
    console.log("In PassrvApi")
    fetch(Passrv, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        u_number: this.state.mob_num
      })
    })
      .then(data => {
        return data.json()
      })
      .then(data => {
        console.log("Passrv Response", data)
        if(data.message=="Correct number"){
          this.props.navigation.navigate('OtpScreen',{
            mobile_num:this.state.mob_num
          })
                  
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
      <Container>
        <Header ><Text style={styles.headline}>Password Recovery</Text></Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Mobile Number</Label>
              <Input onChangeText={(text)=>{this.setState({mob_num:text})}} 
                    keyboardType = 'numeric' maxLength={10}/>
            </Item>
            
            <Button rounded full
                onPress={() => this.PassrvApi()}>
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
