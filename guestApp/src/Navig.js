import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView
} from 'react-native';
// import {SingleImage} from 'react-native-zoom-lightbox';
import PhotoView from 'react-native-photo-view-ex';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import WebView from 'react-native-webview';
import ListView from 'deprecated-react-native-listview';
import {createAppContainer} from 'react-navigation';
import Pdf from 'react-native-pdf';
import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import InfiniteScroll from 'react-native-infinite-scroll';
// import Pdf from 'react-native-pdf';
import Connectable from './helpers/connectable';
import CameraRoll from '@react-native-community/cameraroll';
import Swiper from 'react-native-swiper';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import * as ImagePicker from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image';
import {PermissionsAndroid,TextInput} from 'react-native';
import {connect} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
const GET_RESTAURANT_OVERVIEW = 'GET_RESTAURANT_OVERVIEW';
import App from './App';
import App2 from './App2';
import Anot from './Anot';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import HTMLView from 'react-native-htmlview';
import i18n from './strings/I18n';
const Stack = createStackNavigator();
const Stacks = () => {
  return (
    <Stack.Navigator screenOptions={{keyboardHandlingEnabled: false}}>
      <Stack.Screen name="Feed" component={Anot} />
      <Stack.Screen name="Messages" component={App2} />
    </Stack.Navigator>
  );
};
const imagePickerOptions = {
  quality: 1.0,
  maxWidth: 2000,
  maxHeight: 2000,
  storageOptions: {
    skipBackup: true,
  },
};
const mapStateToProps = state => {
  return {
    photos: state.restaurantOverview.photos,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getRestaurantOverview: () => {
      dispatch({type: GET_RESTAURANT_OVERVIEW});
    },
  };
};
class Navig extends Component {
  constructor(props) {
    super(props);
    this.state = {pdfView:false,isDatePickerVisible:false};
  }
  componentWillMount() {
    this.props.getRestaurantOverview();
  }
  edit = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, response => {
      if (response.didCancel) {
      } else if (response.error) {
        Alert.alert(I18n.t('ChatStrings.stringError'), response.error);
      } else if (response.customButton) {
      } else {
        console.log('MAI');
      }
    });
  };
  getInitialState = () => {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var rows = ['China', 'Korea', 'Singapore', 'Malaysia'];
    return {
      data: rows,
      dataSource: ds.cloneWithRows(rows),
    };
  };
  _scrollToInput(reactNode) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
  }
  loadMorePage = () => {
    //here .. collect the data from server somehow
    let new_data = ['Japan', 'Myanmar', 'India', 'Thailand'];
    let rows = this.state.data;
    rows.push.apply(rows, new_data);
    this.setState({
      data: rows,
      dataSource: this.state.dataSource.cloneWithRows(rows),
    });
  };
  openPdf = () => {
    console.log('elau');
    const url =
      'https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf';

    // *IMPORTANT*: The correct file extension is always required.
    // You might encounter issues if the file's extension isn't included
    // or if it doesn't match the mime type of the file.
    // https://stackoverflow.com/a/47767860
    function getUrlExtension(url) {
      return url.split(/[#?]/)[0].split('.').pop().trim();
    }

    const extension = getUrlExtension(url);

    // Feel free to change main path according to your requirements.
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
      })
      .catch(error => {
        // error
      });
  };
   showDatePicker = () => {
     
    this.setState({isDatePickerVisible:true});
  };

   hideDatePicker = () => {
    this.setState({isDatePickerVisible:false});
  };

   handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    this.hideDatePicker();
  };
  _handleButtonPress = () => {
    console.log('hei')
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      .then(r => {
        console.log(r);
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
         //Error Loading Images
      });
    };
    
 render() {
  const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
  return (

    <PhotoView
    source={{uri: 'https://avatars2.githubusercontent.com/u/31804215?s=40&v=4'}}
    minimumZoomScale={0.5}
    maximumZoomScale={3}
    resizeMode="center"
    onLoad={() => console.log("Image loaded!")}
    style={{width: 300, height: 300}}
  />
  );
 }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 25,
  },
  pdf: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Navig);
