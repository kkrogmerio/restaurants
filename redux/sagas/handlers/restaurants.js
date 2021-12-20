import {call,put} from 'redux-saga/effects';
import {requestGetRestaurants} from '../requests/restaurants';
import { SET_RESTAURANTS_DATA } from '../../restaurants';
export function* handleGetRestaurants(){
    try{
        const response=yield call(requestGetRestaurants);
        const {data}=response;
        for(let i in data)
        console.log(data[i]);
        yield put({type:SET_RESTAURANTS_DATA,restaurantsData:data})
    }catch(error){
        console.log(error);
    }
}