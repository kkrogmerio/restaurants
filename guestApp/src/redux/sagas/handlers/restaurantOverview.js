import {call, put} from 'redux-saga/effects';
import {requestGetOverview} from '../requests/restaurantOverview';

import {SET_RESTAURANT_OVERVIEW} from '../../reducers/restaurantOverview';

export function* handleGetOverview(data) {
  try {
    let response;
    if (data.payload !== undefined) response = data.payload;
    else response = yield call(requestGetOverview);
    response = response.val();

    let branches = [];
    let n = 0;
    for (let branch of response.branches) {
      branches.push(parseBranches(branch, n));
      n += 1;
    }
    let connect = parseConnect(response.connect);
    let photos = [];
    for (let photo of response.photos) {
   
      photos.push(photo);
    }
    let programs = [];

    for (let program of response.program) {
      programs.push(parsePrograms(program));
    }

    let socialmedia = parseSocialMedia(response.socialmedia);
    let payload = {
      backgroundImage: response.backgroundImage,
      branches: branches,
      connect: connect,
      logo: response.logo,
      name: 'b+f',
      photos: photos,
      program: programs,
      socialmedia: socialmedia,
      description: response.description,
    };
    console.log(payload.photos[0]);
    yield put({type: SET_RESTAURANT_OVERVIEW, payload: payload});
  } catch (e) {
    console.error(e);
  }
}
function parseBranches(branch, n) {
  return {
    address: branch.address,
    latitude: branch.latitude,
    longitude: branch.longitude,
    name: branch.name,
    pinLocationIcon:
      n == 0
        ? 'https://www.linkpicture.com/q/pin-location1.png'
        : 'https://www.linkpicture.com/q/pin-location2.png',
    goToIcon:
      n == 0
        ? 'https://www.linkpicture.com/q/go-to-location.png'
        : 'https://www.linkpicture.com/q/go-to-location2_2.png',
  };
}
function parseConnect(connect) {
  return {
    email: connect.email,
    location: connect.location,
    phone: connect.phone,
    website: connect.website,
  };
}
function parsePrograms(program) {
  return {
    days: program.days,
    hours: program.hours,
  };
}
function parseSocialMedia(socialmedia) {
  return {
    facebook: socialmedia.facebook,
    gplus: socialmedia.gplus,
    instagram: socialmedia.instagram,
    twitter: socialmedia.twitter,
    youtube: socialmedia.youtube,
  };
}
