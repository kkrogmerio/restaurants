

import React from 'react';
import {
  View,
} from 'react-native';
import { Provider, connect } from 'react-redux'
import store from './redux/configure_store';
import {GET_RESTAURANTS} from './redux/restaurants';
const mapStateToProps=state=>{
  return{restaurants:state.restaurants.restaurantsData}
}
const mapDispatchToProps=dispatch=>{
  return{
    getRestaurantsData:()=>{
      dispatch({type:GET_RESTAURANTS})
    }
  }
}
class App extends React.Component {
  constructor(props){
    super(props)
    this.state={}
  }
  componentDidMount(){
    this.props.getRestaurantsData();

  }
  render() {
    
    if(this.props.restaurants){
      console.log(this.props.restaurants);
    }
    return (
      <View></View>
    );
  }
}
const AppContainer=connect(mapStateToProps, mapDispatchToProps)(App)

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
};
export default AppWrapper;
