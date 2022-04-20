
import {name as appName} from './app.json';
import React, { Component } from 'react';
import { AppRegistry, BackHandler, LogBox } from 'react-native';
import DeviceInfo from "react-native-device-info";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler'
// import firebase from 'firebase';

import Navig from './src/Navig';
import I18n from "./src/strings/I18n";

import store from './src/redux/configure_store';
// import { Connectable } from './src/helpers';
import { Provider } from 'react-redux';
import moment from "moment";
class MainApplication extends Component {
    componentDidMount() {
		// Connectable.startConnectionListener();
        BackHandler.addEventListener('hardwareBackPress', function() {
            try {
                this.goBack();
                return true;
            } catch (err) {
                return false;
            }
        });

        LogBox.ignoreLogs([
            "Require cycle:",
            "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation",
            "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android"
        ])
    }

    componentWillUnmount() {
    	// Connectable.stopConnectionListener();
        BackHandler.removeEventListener('hardwareBackPress', BackHandler.exitApp);
    }

    render() {
        
        moment.locale(I18n.locale);

        formattedDate = moment(new Date()).format('dddd Do MMMM');
        formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

        let dayOfWeek = formattedDate.substr(0, formattedDate.indexOf(' '));
        let dateAsString = formattedDate.substr(formattedDate.indexOf(' ') + 1);

        if (I18n.locale === "da") {
            formattedDate = `${ dayOfWeek } d. ${ dateAsString }`;
        } else {
            formattedDate = `${ dayOfWeek }, ${ dateAsString }`;
        }

        formattedHour = moment(new Date()).format('HH:mm');
       

        onlyDate = moment(new Date()).format('YYYY-MM-DD');
        console.log(formattedHour,onlyDate,formattedDate);

        return (
            <Provider store={ store }>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Navig />
                </GestureHandlerRootView>
                 </Provider>
           
        );
    }
}

AppRegistry.registerComponent(appName, () => MainApplication);
