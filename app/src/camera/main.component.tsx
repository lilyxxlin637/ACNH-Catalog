'use strict';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ImageBackground} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "react-native-text-detector";


//Still need to set up android section according to the following github
//https://github.com/zsajjad/react-native-text-detector/tree/tesseract#also-add--lstdc-if-not-already-present
//https://blog.nativebase.io/text-recognition-app-using-react-native-3537ccecda6

export const CameraScreen = ({ navigation}): React.ReactElement => {

  var camera;
  var imguri = ""

  var state = {
    language: "eng", //can change based on input
    loading: false,
    image: null,
    error: null,
    visionResp: []
  };

  const mapVisionRespToScreen = (visionResp, imageProperties) => {
    const IMAGE_TO_SCREEN_Y =  Dimensions.get('window').height / imageProperties.height;
    const IMAGE_TO_SCREEN_X = Dimensions.get('window').width  / imageProperties.width;

    return visionResp.map(item => {
      //TODO: return if within the lib
      return {
        ...item,
        position: {
          width: item.bounding.width * IMAGE_TO_SCREEN_X,
          left: item.bounding.left * IMAGE_TO_SCREEN_X,
          height: item.bounding.height * IMAGE_TO_SCREEN_Y,
          top: item.bounding.top * IMAGE_TO_SCREEN_Y
        }
      };
    });
  };

  const takePicture = async () => {
    this.setState({
      loading: true
    });
    if (camera) {
      try {
        const options = {
          quality: 0.8,
          base64: true,
          skipProcessing: true,
        };
        const data = await camera.takePictureAsync(options);
        const visionResp = await RNTextDetector.detect({
           imagePath: data.uri,
           language: state.language,
           pageIteratorLevel: "textLine",
      });
      
        if (!(visionResp && visionResp.length > 0)) {
          console.warn("OCR:Did not find any text");
        }else{
          state.visionResp = mapVisionRespToScreen(visionResp, {height: data.height, width: data.width});
          imguri = data.uri;
          this.setState({
            image: data.uri
          })
        }
        // console.log('visionResp', visionResp);
      } catch (e) {
        console.warn(e);
        console.warn("OCR:Failed")
      }
      
    }
  };
  const renderCamera = () => {
    // const imguri = JSON.stringify(state.image)
      if(true){
        return (
          <View style={styles.container}>
            <RNCamera>
              ref={ref => {
                camera= ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                  <TouchableOpacity onPress={takePicture.bind(this)} style={styles.capture}>
                    <Text style={{ fontSize: 14 }}> Scan</Text>
                  </TouchableOpacity>
              </View>
            </RNCamera>
            </View>
        );
      }else{
        return (
          <View style={styles.container}>
            <ImageBackground
            source={{ uri: state.image }}
            style={styles.imageBackground}
            key="image"
            resizeMode="cover"
          >
            {state.visionResp.map(item => {
              return (
                <TouchableOpacity
                  style={[styles.boundingRect, item.position]}
                  key={item.text}
                />
              );
            })}
          </ImageBackground>
          </View>
        );
      }
    }

    return (
      renderCamera()
    );

  }


const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#fff',
    flex: 1
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  preview_img: {
    position: "absolute",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  boundingRect: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF6600"
  },  
  imageBackground: {
    position: "absolute",
    width: Dimensions.get('window').width ,
    height: Dimensions.get('window').height ,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    top: 0,
    left: 0
  },
});

// AppRegistry.registerComponent('App', () => ExampleApp);