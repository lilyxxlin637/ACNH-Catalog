'use strict';
import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNTextDetector from "react-native-text-detector";

//Still need to set up android section according to the following github
//https://github.com/zsajjad/react-native-text-detector/tree/tesseract#also-add--lstdc-if-not-already-present
//https://blog.nativebase.io/text-recognition-app-using-react-native-3537ccecda6

export const CameraScreen = ({ navigation}): React.ReactElement => {

  var camera;
  var imguri;


  const mapVisionRespToScreen = (visionResp) => {
    const IMAGE_TO_SCREEN_Y = 1;//screenHeight / imageProperties.height;
    const IMAGE_TO_SCREEN_X = 1;//screenWidth / imageProperties.width;

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
    if (camera) {
      try {
        const options = {
          quality: 0.8,
          base64: true,
          skipProcessing: true,
        };
        const { uri } = await camera.takePictureAsync(options);
        this.setState({ path: uri });
        const visionResp = await RNTextDetector.detectFromUri(uri);
      //   detect({
      //     imagePath: uri, // this can be remote url as well, package will handle such url internally
      //     language: "eng", //Need to set accordingly
      //     pageIteratorLevel: "textLine",
      // });
        if (!(visionResp && visionResp.length > 0)) {
          console.warn("OCR:Did not find any text");
        }else{
          mapVisionRespToScreen(visionResp);
        }
        // console.log('visionResp', visionResp);
      } catch (e) {
        console.warn(e);
        console.warn("OCR:Failed")
      }
      
    }
  };
  const renderCamera = () => {
    return (
        <View style={styles.container}>
          <RNCamera
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
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
              console.log(barcodes);
            }} 
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const renderImage = () => {
      return (
        <View>
          <img src={require(imguri)}/>
          <Text
            style={styles.cancel}
            onPress={() => this.setState({ path: null })}
          >Cancel
          </Text>
        </View>
      );
    }



    return (
      <View style={styles.container}>
        {renderCamera()
        /* {this.state.path ? renderImage() : renderCamera()} */}
      </View>
    );

  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  preview_img: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
});

// AppRegistry.registerComponent('App', () => ExampleApp);