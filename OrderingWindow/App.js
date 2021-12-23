import React from 'react';
import {Provider, connect} from 'react-redux';
import store from './redux/configure_store';
import {GET_RESTAURANTS_MENU} from './redux/restaurants';
import {GET_RESTAURANTS_ORDER} from './redux/restaurants';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import fontStyle from './constants/fontStyle';
import LinearGradient from 'linear-gradient';
// import AppNavigator from './navigation/OrderingWindowNavigator';
import FastImage from 'react-native-fast-image';
const mapStateToProps = state => {
  return {
    restaurantsMenu: state.restaurants.restaurantsMenu,
    restaurantsOrder: state.restaurants.restaurantsOrder,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getRestaurantsMenu: () => {
      dispatch({type: GET_RESTAURANTS_MENU});
    },
    getRestaurantsOrder: () => {
      dispatch({type: GET_RESTAURANTS_ORDER});
    },
  };
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
    };
  }
  componentDidMount() {
    this.setState({isLoading: true});

    try {
      this.props.getRestaurantsOrder();
      this.props.getRestaurantsMenu();
    } catch (e) {
      this.setState({isLoading: false});
      this.setState({isError: true});
    }
    this.setState({isLoading: false});
  }
  render() {
    let dishes = this.props.restaurantsMenu.dishes;
    let groups = this.props.restaurantsMenu.groups;
    let categories = this.props.restaurantsMenu.categories;
    // console.log(this.state.isLoading)
    // if (this.state.isLoading) {

    //   return <View style={styles.appStatus}><ActivityIndicator size="large" color="#00ff00" /></View>
    // }
    // else if(this.state.isError){
    //   return <View style={styles.appStatus}><Text>Error occurred</Text></View>
    // }
    // else if(this.props.restaurantsOrder&&this.props.restaurantsMenu)
    // {
    //   console.log(this.props.restaurantsOrder,'\n\n',this.props.restaurantsMenu);
    //   return <View />;
    // }
    // else
    return (
      <View style={styles.fullScreen}>
        <View style={{flex: 1, backgroundColor: '#222'}} />
        <View
          style={{flex: 15, backgroundColor: 'white', flexDirection: 'row'}}>
          <View style={{height: '100%', flex: 1, backgroundColor: '#222'}} />
          <View style={{height: '100%', flex: 9,flexDirection: 'row'}}>
            <View style={{height: '100%', flex: 5.2}}>
              <Text style={styles.menuItem}>Group</Text>
              <FlatList
                  horizontal
                  data={groups}
                  renderItem={itemData => (
                    <View>
                      <FastImage
                        style={styles.dishImage}
                        source={{uri: itemData.item.imageUrl}}>
                        <View style={styles.dishOverlay}>
                          <Text style={fontStyle.fontDetailsBox}>
                            {itemData.item.name}
                          </Text>
                        </View>
                      </FastImage>
                    </View>
                  )}
                  keyExtractor={item => item.title}
                />
              <View style={{flexDirection: 'row'}}>
                <View style={{marginHorizontal: 20}}>
                  <View style={styles.groupBox}>
                    <Text style={fontStyle.fontDetailsBox}>Breakfast</Text>
                  </View>
                  <View style={styles.selectedItem} />
                </View>
                <View style={{marginHorizontal: 20}}>
                  <View style={styles.groupBox}>
                    <Text style={fontStyle.fontDetailsBox}>Lunch</Text>
                  </View>
                  <View style={styles.selectedItem} />
                </View>
              </View>
              <Text style={styles.menuItem}>Category</Text>
              <FlatList
                  horizontal
                  data={categories}
                  renderItem={itemData => (
                    <View>
                      <FastImage
                        style={styles.dishImage}
                        source={{uri: itemData.item.imageUrl}}>
                        <View style={styles.dishPrice}>
                          <Text style={fontStyle.fontDetailsBox}>${itemData.item.price}</Text>
                        </View>
                        <View style={styles.dishOverlay}>
                          <Text style={fontStyle.fontDetailsBox}>
                            {itemData.item.name}
                          </Text>
                        </View>
                      </FastImage>
                    </View>
                  )}
                  keyExtractor={item => item.title}
                />
              <View style={{flexDirection: 'row'}}>
                <View style={{marginHorizontal: 20}}>
                  <View style={styles.groupBox}>
                    <Text style={fontStyle.fontDetailsBox}>Breakfast</Text>
                  </View>
                  <View style={styles.selectedItem} />
                </View>
                <View style={{marginHorizontal: 20}}>
                  <View style={styles.groupBox}>
                    <Text style={fontStyle.fontDetailsBox}>Lunch</Text>
                  </View>
                  <View style={styles.selectedItem} />
                </View>
              </View>
              <Text style={styles.menuItem}>Dishes</Text>
              {/* <FlatList
                  numColumns={dishTypesData.length / 2}
                  horizontal
                  renderItem={itemData => (
                    <View>
                      <FastImage
                        style={styles.dishImage}
                        source={{uri: itemData.item.imageUrl}}>
                        <View style={styles.dishPrice}>
                          <Text style={fontStyle.fontDetailsBox}>${itemData.item.price}</Text>
                        </View>
                        <View style={styles.dishOverlay}>
                          <Text style={fontStyle.fontDetailsBox}>
                            {itemData.item.name}
                          </Text>
                        </View>
                      </FastImage>
                    </View>
                  )}
                  keyExtractor={item => item.title}
                /> */}
              <View style={{flexDirection: 'row', marginBottom: 22.5}}>
                <View style={styles.dishButton}>
                  <Text style={fontStyle.fontDetailsBox}>All</Text>
                </View>
                <View style={styles.dishButton}>
                  <Text style={fontStyle.fontDetailsBox}>All</Text>
                </View>
              </View>
              <ScrollView horizontal>
                <FlatList
                  numColumns={dishes.length / 2}
                  data={dishes}
                  renderItem={itemData => (
                    <View>
                      <FastImage
                        style={styles.dishImage}
                        source={{uri: itemData.item.imageUrl}}>
                        <View style={styles.dishPrice}>
                          <Text style={fontStyle.fontDetailsBox}>${itemData.item.price}</Text>
                        </View>
                        <View style={styles.dishOverlay}>
                          <Text style={fontStyle.fontDetailsBox}>
                            {itemData.item.name}
                          </Text>
                        </View>
                      </FastImage>
                    </View>
                  )}
                  keyExtractor={item => item.title}
                />
              </ScrollView>
            </View>
            <View style={{height: '100%', flex: 3}}></View>
          </View>
        </View>
      </View>
    );
  }
}
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
export default AppWrapper;
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,

    backgroundColor: 'black',
  },
  maineMenuBack: {
    width: 45,
    height: '50%',
    marginRight: 0.5,
    paddingTop: 10.5,
    paddingBottom: 16.5,
    backgroundColor: '#222',
  },
  headerBack: {
    width: 935,
    height: 56,
    marginLeft: 0.5,
    paddingTop: 11.5,
    paddingRight: 18.4,
    paddingBottom: 13,
    paddingLeft: 24.5,
    backgroundColor: '#222',
  },
  orderingWindowScreen: {
    flex: 1,
    width: '100%',
  },
  groupBox: {
    width: 110,
    height: 100,
    marginTop: 11,

    marginBottom: 14,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  selectedItem: {
    width: 110,
    height: 5,
    marginTop: 11.5,
    backgroundColor: '#ef4923',
  },
  menuItem: {
    ...fontStyle.fontDetails,
    marginTop: 13,
    marginRight: 44.5,
    marginBottom: 5,
    marginLeft: 20,
  },
  dishButton: {
    width: 66.5,
    height: 29,
    marginTop: 8,
    marginRight: 13,

    marginLeft: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14.5,
    backgroundColor: '#ef4923',
  },
  dishImage: {
    width: 150,
    height: 125,
    marginTop: 3,
    marginRight: 25,
    marginBottom: 22.5,
    marginLeft: 20.5,
  },
  dishPrice: {
    width: 51,
    height: 22,
    // marginBottom: 69,
    marginLeft: 99,
    paddingTop: 5,
    paddingHorizontal: 6.5,
    paddingBottom: 2.5,
    backgroundColor: '#ef4923',
  },
  dishOverlay: {
    width: 150,
    height: 34,
    marginTop: 70,
    paddingTop:8,
    paddingRight: 50,
   
    paddingLeft: 9,
    opacity: 0.8,
   
  },
});
