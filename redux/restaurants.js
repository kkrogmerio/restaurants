export const GET_RESTAURANTS="GET_RESTAURANTS";
export const SET_RESTAURANTS_DATA="SET_RESTAURANTS_DATA";
const initialState={
    restaurants:undefined
};
export default (state=initialState,action) =>{
    switch(action.type){
        case GET_RESTAURANTS:
            const {restaurants}=action;
            return {restaurants}
        default:
            return state;
    }
}