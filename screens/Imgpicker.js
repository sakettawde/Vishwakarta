import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React from 'react'
   
  import ImagePicker from 'react-native-image-picker';
   
  export default class ImagePickerProject extends React.Component {
    
      state = {
   
        ImageSource: null,
      
      };
    
      selectPhotoTapped() {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: response.uri };
    
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
            this.setState({
   
              ImageSource: source
   
            });
          }
        });
      }
    
      render() {
        return (
          <View style={styles.container}>
   
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
   
              <View style={styles.ImageContainer}>
   
              { this.state.ImageSource === null ? <Text>Select a Photo</Text> :
                <Image style={styles.ImageContainer} source={this.state.ImageSource} />
              }
   
              </View>
   
            </TouchableOpacity>
   
          </View>
        );
      }
    
    }
    
    const styles = StyleSheet.create({
   
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8E1'
      },
   
      ImageContainer: {
        borderRadius: 10,
        width: 250,
        height: 250,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',
        
      },
   
    });
   
 