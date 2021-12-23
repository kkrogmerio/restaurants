import {call, put} from 'redux-saga/effects';
import {requestGetOrder} from '../requests/restaurantsOrder';
import {SET_RESTAURANTS_ORDER} from '../../restaurants';
export function* handleGetOrder() {
  
  try {
    const response = yield call(requestGetOrder);
    const {items,scalars,tables}=response.data;
    
    let itemsData=[];

    for(let i=0;i<items.length;++i){
      
      const {approved,approvedTime,id,isLinkedToConfirmedPayment,isPaid,itemId,itemName,itemPrice,itemPriceWithDiscount,itemRequest,orderId,quantity,udid,orderToppings} =items[i];
      let toppings=[];
    
      for(let topping in orderToppings){
        
        let {isOptional,maximumSelection,minimumSelection}=orderToppings[topping].itemExtra;
        let itemExtra={id:orderToppings[topping].itemExtra.id,isOptional,maximumSelection,minimumSelection};
        let {id,itemExtrasId,name,orderItemId,price,toppingId}=orderToppings[topping];
        toppings.push({id,itemExtra,itemExtrasId,name,orderItemId,price,toppingId});
      }
      itemsData.push({approved,approvedTime,id,isLinkedToConfirmedPayment,isPaid,itemId,itemName,itemPrice,itemPriceWithDiscount,itemRequest,orderId,toppings,quantity,udid})
    }
    
      const {amount,branchId,connectionCode,customerVisitId,invoiceReferenceNo,kNeyPaymentInProgress,orderDate,orderDiscount,orderId,partySize,restaurantId,sessionStartDate,specialRequest,status} =scalars;
      scalarsData={ amount,branchId,connectionCode,customerVisitId,invoiceReferenceNo,kNeyPaymentInProgress,orderDate,orderDiscount,orderId,partySize,restaurantId,sessionStartDate,specialRequest,status}
    
    let tablesData=[];
    for(let i=0;i<tables.length;++i){
      const {roomId,tableId} =tables[i];
      tablesData.push({ roomId,tableId})
    }
   
    let orderData={items:itemsData,scalars:scalarsData,tables:tablesData}
    
    
    yield put({type: SET_RESTAURANTS_ORDER,orderData});
  } catch (error) {
    throw new Error(error.message);
  }
}
