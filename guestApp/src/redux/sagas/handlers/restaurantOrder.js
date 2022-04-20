import {call, put} from 'redux-saga/effects';
import {requestGetOrder} from '../requests/restaurantOrder';
import {SET_RESTAURANT_ORDER} from '../../reducers/restaurantMenu';
export function* handleGetOrder() {
  try {
    const response = yield call(requestGetOrder);
    const {items, scalars, tables} = response.data;

    let itemsData = [];

    for (let i = 0; i < items.length; ++i) {
      itemsData.push(parseItems(items[i]));
    }

    scalarsData = {
      amount: scalars.amount,
      branchId: scalars.branchId,
      connectionCode: scalars.connectionCode,
      customerVisitId: scalars.customerVisitId,
      invoiceReferenceNo: scalars.invoiceReferenceNo,
      kNeyPaymentInProgress: scalars.kNeyPaymentInProgress,
      orderDate: scalars.orderDate,
      orderDiscount: scalars.orderDiscount,
      orderId: scalars.orderId,
      partySize: scalars.partySize,
      restaurantId: scalars.restaurantId,
      sessionStartDate: scalars.sessionStartDate,
      specialRequest: scalars.specialRequest,
      status: scalars.status,
    };

    let tablesData = [];
    for (let i = 0; i < tables.length; ++i) {
      tablesData.push(parseTables(tables[i]));
    }

    let orderData = {
      items: itemsData,
      scalars: scalarsData,
      tables: tablesData,
    };
  
    yield put({type: SET_RESTAURANT_ORDER, orderData});
  } catch (error) {
    throw new Error(error.message);
  }
}
function parseItems(item) {
  let itemToppings = [];
  for (let topping in item.orderToppings)
    itemToppings.push(parseItemToppings(item.orderToppings[topping]));
  return {
    approved: item.approved,
    approvedTime: item.approvedTime,
    id: item.id,
    isLinkedToConfirmedPayment: item.isLinkedToConfirmedPayment,
    isPaid: item.isPaid,
    itemId: item.itemId,
    itemName: item.itemName,
    itemPrice: item.itemPrice,
    itemPriceWithoutDiscount: item.itemPriceWithoutDiscount,
    itemRequest: item.itemRequest,
    orderToppings:itemToppings,
    orderId: item.orderId,
    quantity: item.quantity,
    udid: item.udid,
  };
}
function parseItemToppings(topping) {
  let itemExtra = {
    isOptional: topping.itemExtra.isOptional,
    maximumSelection: topping.itemExtra.maximumSelection,
    minimumSelection: topping.itemExtra.minimumSelection,
    id: topping.itemExtra.id,
  };
  return {
    id: topping.id,
    itemExtra,
    itemExtrasId: topping.itemExtrasId,
    name: topping.name,
    orderItemId: topping.orderItemId,
    price: topping.price,
    toppingId: topping.toppingId,
  };
}
function parseTables(table) {
  return {roomId: table.roomId, tableId: table.tableId};
}
