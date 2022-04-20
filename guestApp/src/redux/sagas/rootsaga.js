import {takeLatest} from 'redux-saga/effects';
import { GET_RESTAURANT_MENU,GET_RESTAURANT_ORDER,CONFIGURE_FIREBASE } from '../reducers/restaurantMenu';
import { handleGetMenu} from './handlers/restaurantMenu';
import { handleGetOrder} from './handlers/restaurantOrder';
import { handleGetOverview} from './handlers/restaurantOverview';
import {configureFirebase} from './handlers/firebase'
import { GET_RESTAURANT_OVERVIEW } from '../reducers/restaurantOverview';
export function* watcherSaga(){
    yield takeLatest(GET_RESTAURANT_MENU,handleGetMenu);
    yield takeLatest(GET_RESTAURANT_ORDER,handleGetOrder);
    yield takeLatest(GET_RESTAURANT_OVERVIEW,handleGetOverview);
    yield takeLatest(CONFIGURE_FIREBASE,configureFirebase);
   

}