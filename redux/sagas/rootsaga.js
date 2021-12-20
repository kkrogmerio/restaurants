import {takeLatest} from 'redux-saga/effects';
import { GET_RESTAURANTS } from '../restaurants';
import { handleGetRestaurants } from './handlers/restaurants';
export function* watcherSaga(){
    yield takeLatest(GET_RESTAURANTS,handleGetRestaurants);
}