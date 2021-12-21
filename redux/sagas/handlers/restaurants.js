import {call, put} from 'redux-saga/effects';
import {requestGetRestaurants} from '../requests/restaurants';
import {SET_RESTAURANTS_DATA} from '../../restaurants';
export function* handleGetRestaurants() {
  try {
    const response = yield call(requestGetRestaurants);
    const {data} = response;
    let restaurantsData = [];

    for (let i in data) {
      let waiterInfoData = [];
      data[i].waiterInfo.forEach(ie =>
        waiterInfoData.push({
          employeeId: ie.employeeId,
          waiterName: ie.waiterName,
        }),
      );
      restaurantsData.push({
        deviceAddress: data[i].deviceAddress,
        deviceId: parseInt(data[i].deviceId),
        deviceStatus: data[i].deviceStatus,
        isAdminDevice: !!data[i].isAdminDevice,
        onlineSince: new Date(data[i].onlineSince),
        waiterDeviceId: parseInt(data[i].waiterDeviceId),
        waiterInfoData,
      });
    }
    
    yield put({type: SET_RESTAURANTS_DATA, restaurantsData});
  } catch (error) {
    console.log(error);
  }
}
