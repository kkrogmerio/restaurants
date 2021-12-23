import {takeLatest} from 'redux-saga/effects';
import { GET_RESTAURANTS_MENU,GET_RESTAURANTS_ORDER } from '../restaurants';
import { handleGetMenu} from './handlers/restaurantsMenu';
import { handleGetOrder} from './handlers/restaurantsOrder';
export function* watcherSaga(){
    yield takeLatest(GET_RESTAURANTS_MENU,handleGetMenu);
    yield takeLatest(GET_RESTAURANTS_ORDER,handleGetOrder);
}