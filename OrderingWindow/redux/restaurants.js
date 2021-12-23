export const GET_RESTAURANTS_MENU="GET_RESTAURANTS_MENU";
export const SET_RESTAURANTS_MENU="SET_RESTAURANTS_MENU";
export const GET_RESTAURANTS_ORDER="GET_RESTAURANTS_ORDER";
export const SET_RESTAURANTS_ORDER="SET_RESTAURANTS_ORDER";
const initialState={
    restaurantsMenu:undefined,
    restaurantsOrder:undefined
};
export default (state=initialState,action) =>{
    switch(action.type){
        case SET_RESTAURANTS_MENU:
            
            const {menuData}=action;
            return {...state,restaurantsMenu:menuData}
        case SET_RESTAURANTS_ORDER:
            
            const {orderData}=action;
            return {...state,restaurantsOrder:orderData}
        default:
            return state;
    }
}