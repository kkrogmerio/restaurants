export const GET_RESTAURANT_OVERVIEW = 'GET_RESTAURANT_OVERVIEW';
export const SET_RESTAURANT_OVERVIEW = 'SET_RESTAURANT_OVERVIEW';
export const SET_RESTAURANT_SUCCESS = 'SET_RESTAURANT_SUCCESS';
export const SET_RESTAURANT_FAIL = 'SET_RESTAURANT_FAIL';
export const ZOOM_PHOTO_IN_GALLERY = 'ZOOM_PHOTO_IN_GALLERY';
export const UNZOOM_PHOTO_IN_GALLERY = 'UNZOOM_PHOTO_IN_GALLERY';
export default (state = {}, action) => {
  switch (action.type) {
    case SET_RESTAURANT_OVERVIEW:
      return action.payload;
      case SET_RESTAURANT_SUCCESS:
      console.log("REACT REDUX SUCCESS");return {};
      case SET_RESTAURANT_FAIL:
        console.log("REACT REDUX FAIL");
      return {};
    case ZOOM_PHOTO_IN_GALLERY:
      return {...state, zoomPhoto: true};
    case UNZOOM_PHOTO_IN_GALLERY:
      return {...state, zoomPhoto: false};
    default:
      return state;
  }
};
