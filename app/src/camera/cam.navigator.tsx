import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {CameraScreen} from './main.component';

const CamStack = createStackNavigator();


export const CamNavigator = (): React.ReactElement => (
  <CamStack.Navigator>
    <CamStack.Screen name='Camera' component={CameraScreen}/>
  </CamStack.Navigator>
);
