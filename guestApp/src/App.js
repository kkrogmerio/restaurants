/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createTabNavigator } from 'react-navigation-tabs';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {ListItem} from 'react-native-elements'
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import CameraRoll from '@react-native-community/cameraroll';

import { Button } from 'react-native-elements';

const App = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const edit=()=>{
    console.log(this.refs.hei);
  }
  const backgroundStyle = {
    backgroundColor: Colors.darker
  };

  return (
    

         
            <View/>)
 
  
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
