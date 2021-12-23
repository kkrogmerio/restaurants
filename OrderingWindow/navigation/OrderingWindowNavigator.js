import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import {StyleSheet,View} from 'react-native';
// import { createSideTabNavigator } from "react-navigation-side-tabs";
// import AdminScreen from '../screens/Admin';
// import FloorScreen from '../screens/Floor';
// import MenuScreen from '../screens/Menu';
// import SupportScreen from '../screens/Support';
// import WaitlistScreen from '../screens/Waitlist';
// import LogoutScreen from '../screens/Logout';
class AppNavigatorD extends React.Component {
    render() {
        return <View/>
            // <NavigationContainer>
                
            // </NavigationContainer>
        
    }
}
export default AppNavigatorD;
const Tab = createBottomTabNavigator();
// class WindowOrderNavigator extends React.Component {
//     render() {
//         return (
//             <Tab.Navigator >
//                 <Tab.Screen component={FloorScreen}/>
//                 <Tab.Screen component={WaitlistScreen}/>
//                 <Tab.Screen component={AdminScreen}/>
//                 <Tab.Screen component={MenuScreen}/>
//                 <Tab.Screen component={SupportScreen}/>
//                 <Tab.Screen component={LogoutScreen}/>
//             </Tab.Navigator>
//         )
//     }
// }
const styles = StyleSheet.create({
    tapBarStyle:{ 
        width: 140,
        height: '100%',
        marginRight:0.5,
        paddingTop:10.5,
        paddingBottom:16.5,
        backgroundColor: "#222"
    }
});