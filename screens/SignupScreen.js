import React from 'react';
import { StyleSheet,  View  ,AsyncStorage } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label , Button ,DatePicker, Text, Left, Right 
, Radio, Picker,Icon} from 'native-base';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      chosenDate: new Date(),
      isSelect1: true,
      isSelect2: false,
      selected_prof: 'key0',
      selected_gotra: 'key0',
      name:"",
      mobile_num:"",
      password:"",
     
      toggle:"",
      profession:"",
      gotra:""
     };
    this.setDate = this.setDate.bind(this);

  }
  /*info_array={
      name:"",
      mobile_num:"",
      password:"",
      birthdate:"",
      toggle:"",
      profession:"",
      gotra:""
  }
*/
  _storeData = async () => {
    try {
      await AsyncStorage.setItem("name" , this.state.name);
      await AsyncStorage.setItem("mobile_num" , this.state.mobile_num);
      await AsyncStorage.setItem("password" , this.state.password);
      await AsyncStorage.setItem("birthdate" , this.state.chosenDate.toString().substr(4,12));
      await AsyncStorage.setItem("toggle" , this.state.isSelect1.toString());
      await AsyncStorage.setItem("prof" , this.state.selected_prof);
      await AsyncStorage.setItem("gotra" , this.state.selected_gotra);
    } catch (error) {
      console.log('error saving item!')
    }
  }
  fillinfo=()=>{
    console.log(this.state.name)
    console.log(this.state.mobile_num)
    console.log(this.state.password)
    console.log(this.state.chosenDate.toString().substr(4, 12))
    console.log(this.state.isSelect1)
    console.log(this.state.selected_prof)
    console.log(this.state.selected_gotra)
    this._storeData()
    this.props.navigation.navigate('SignupScreen2',this.info_array)
  }


  _onPressHandle = () => {
    this.setState({isSelect1: !this.state.isSelect1, isSelect2 : !this.state.isSelect2})
  }
  
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onProfChange(value : string) {
    this.setState({
      selected_prof: value
    });
  }
  onGotraChange(value : string) {
    this.setState({
      selected_gotra: value
    });
  }
 
  render() {
    return (
      <Container>
        <Header ><Text>SignUp </Text></Header>
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input onChangeText={text=>{this.setState({name:text})}}/>
            </Item>
            <Item stackedLabel>
              <Label>Mobile Number</Label>
              <Input onChangeText={text=>{this.setState({mobile_num:text})}}/>
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input  secureTextEntry={true} onChangeText={text=>{this.setState({password:text})}}/>
            </Item>
            <Item stackedLabel>
                <Label>BirthDate</Label>
              
                <DatePicker
                  defaultDate={new Date(2018, 4, 4)}
                  minimumDate={new Date(2018, 1, 1)}
                  maximumDate={new Date(2018, 12, 31)}
                  locale={"en"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={this.state.chosenDate.toString().substr(4, 12)}
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={text=>this.setState({chosenDate:text})}
                  />
                  
            </Item>

            
            <Item>
              <View style={{flexDirection:'row',justifyContent:"space-evenly",padding:10}}>
              <View style={{flex:1}}></View>
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
                <View style={{flex:1}}></View>
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
              <Picker.Item label="Doctor" value="key0" />
              <Picker.Item label="Engineer" value="key1" />
              <Picker.Item label="CA" value="key2" />
              <Picker.Item label="Lawyer" value="key3" />
              <Picker.Item label="Other" value="key4" />
            </Picker>
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
              <Picker.Item label="Doctor" value="key0" />
              <Picker.Item label="Engineer" value="key1" />
              <Picker.Item label="CA" value="key2" />
              <Picker.Item label="Lawyer" value="key3" />
              <Picker.Item label="Other" value="key4" />
            </Picker>
            </Item>
            
            
            
          </Form>
          <Button rounded full
          onPress={() => this.fillinfo()}>
            <Text style={{ color: 'white' }}>Next</Text>
        </Button>
        </Content>
      </Container>
    
      
    );
  }
}
