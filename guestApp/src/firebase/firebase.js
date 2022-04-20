import * as firebase from "firebase";
import RNfirebase from 'react-native-firebase';
import firebaseConfig,{overviewDatabaseUrl} from './firebaseConfig';
import { WAIT_FOR_ACTION, ERROR_ACTION } from 'redux-wait-for-action-rn';
import store from "../redux/configure_store";
import { SET_RESTAURANT_OVERVIEW,SET_RESTAURANT_SUCCESS,SET_RESTAURANT_FAIL } from "../redux/reducers/restaurantOverview";
import { SET_RESTAURANT_MENU } from "../redux/reducers/restaurantMenu";
 class Firebase{
    constructor(){
      
        this.initializedFirebase = firebase.initializeApp(firebaseConfig);
     
        this.menuDatabase=this.initializedFirebase.database();
        
        this.overviewDatabase=this.initializedFirebase.database(overviewDatabaseUrl);
        this.configurate=this.configurate.bind(this);
    }
    subscribeToFirebase(){
          
            this.menuDatabase.ref(`viewStore/${ this.restaurantId }/menus/${this.menuId}`).on('value',snapshot=>store.dispatch({type:SET_RESTAURANT_MENU,payload:snapshot}))
            this.overviewDatabase.ref('/about-us').on('value',snapshot=>store.dispatch({type:SET_RESTAURANT_OVERVIEW,payload:snapshot,[WAIT_FOR_ACTION]:SET_RESTAURANT_SUCCESS,[ERROR_ACTION]:SET_RESTAURANT_FAIL}),function(error) {
                console.error(error);
            });
        }
    configurate(restaurantId,branchId,menuId,menuConstraintId){
        this.restaurantId=restaurantId;
        this.branchId=branchId;
        this.menuId=menuId;
        this.menuConstraintId=menuConstraintId;
        this.subscribeToFirebase();
    }

}
export default Client=new Firebase();