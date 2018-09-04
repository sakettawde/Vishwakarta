import React from 'react';
import { StyleSheet,  View } from 'react-native';
import {Container, Header, Content, Form, Item, Input, Label , Button ,DatePicker, Text, Left, Right 
, Radio, Picker,Icon} from 'native-base';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      chosenDate: new Date(),
      isSelect1: true,
      isSelect2: false,
      selected: undefined,
      name:"",
      mobile_num:"",
      password:"",
      birthdate:"",
      toggle:"",
      Profession:"",
      Gotra:""
     };
    this.setDate = this.setDate.bind(this);

  }
  _onPressHandle = () => {
    this.setState({isSelect1: !this.state.isSelect1, isSelect2 : !this.state.isSelect2})
  }
  
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onValueChange(value : string) {
    this.setState({
      selected: value
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
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Mobile Number</Label>
              <Input />
            </Item>
            <Item stackedLabel>
              <Label>Password</Label>
              <Input  secureTextEntry={true}/>
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
                  //onDateChange={this.setDate}
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
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
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
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Doctor" value="key0" />
              <Picker.Item label="Engineer" value="key1" />
              <Picker.Item label="CA" value="key2" />
              <Picker.Item label="Lawyer" value="key3" />
              <Picker.Item label="Other" value="key4" />
            </Picker>
            </Item>
            
            
            
          </Form>
          <Button
          rounded
          full
          onPress={() => {
            this.props.navigation.navigate('SignupScreen2');
          }}>
            <Text style={{ color: 'white' }}>Next</Text>
        </Button>
        </Content>
      </Container>
    
      
    );
  }
}

