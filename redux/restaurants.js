export const GET_RESTAURANTS="GET_RESTAURANTS";
export const SET_RESTAURANTS_DATA="SET_RESTAURANTS_DATA";
const initialState={
    restaurantsData:undefined
};
export default (state=initialState,action) =>{
    switch(action.type){
        case SET_RESTAURANTS_DATA:
            
            const {restaurantsData}=action;
    
    

            return {restaurantsData}
        default:
            return state;
    }
}