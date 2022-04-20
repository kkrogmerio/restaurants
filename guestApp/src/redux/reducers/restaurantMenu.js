export const GET_RESTAURANT_MENU="GET_RESTAURANT_MENU";
export const SET_RESTAURANT_MENU="SET_RESTAURANT_MENU";
export const GET_RESTAURANT_ORDER="GET_RESTAURANT_ORDER";
export const SET_RESTAURANT_ORDER="SET_RESTAURANT_ORDER";
export const CONFIGURE_FIREBASE="CONFIGURE_FIREBASE";
export const SET_MENU_CURRENT_GROUP="SET_MENU_CURRENT_GROUP"
const initialState={
    restaurantMenu:undefined,
    currentGroupId:undefined,
    restaurantOrder:undefined,

};
export default (state=initialState,action) =>{
  
    switch(action.type){
        case SET_RESTAURANT_MENU:
            
            const {menuData}=action;
            return {...state,restaurantMenu:menuData}
        case SET_RESTAURANT_ORDER:
            
            const {orderData}=action;
            return {...state,restaurantOrder:orderData}
        case SET_MENU_CURRENT_GROUP:
                return {...state,currentGroupId:action.groupId}
        default:
            return state;
        
    }
}