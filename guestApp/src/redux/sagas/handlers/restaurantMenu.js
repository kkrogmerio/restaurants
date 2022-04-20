import {call, put} from 'redux-saga/effects';
import {requestGetMenu} from '../requests/restaurantMenu';

import {SET_RESTAURANT_MENU} from '../../reducers/restaurantMenu';

export function* handleGetMenu(data) {
  try {
    let response;
    if(data.payload!==undefined)
    response=data.payload;
    else
    response = yield call(requestGetMenu);
    
    const {dishes, groups, categories} = response.val();
    
    
    let dishesData = [];

    for (let i in dishes) {
      dishesData.push(parseDishes(dishes[i]));
     
    }
    let groupsData = [];
    for (let i in groups) {
      groupsData.push(parseGroups(groups[i]));
 
    }
    let categoriesData = [];
    for (let i in categories) {
      categoriesData.push(parseCategories(categories[i]));

      
    }
    let menuData = {
      dishes: dishesData,
      groups: groupsData,
      categories: categoriesData,
    };
  
    yield put({type: SET_RESTAURANT_MENU, menuData});
  } catch (error) {
 
  }
}
function parseGroups(group) {
  return {
    arabicName: group.arabicName,
    availabilities: group.availabilities,
    available: group.available,
    displayMenu: group.displayMenu,
    endTime: group.endTime,
    id: group.id,
    imageUrl: group.imageUrl,
    name: group.name,
    rank: group.rank,
    startTime: group.startTime,
  };
}
function parseCategories(category) {
  
  return {
    arabicName: category.arabicName,
    available: category.available,
    groupIds: category.groupIds,
    id: category.id,
    maxSelectionNumber: category.maxSelectionNumber,
    name: category.name,
    rank: category.rank,
  };
}
function parseDishes(dish) {
  return {
    arabicDescription: dish.arabicDescription,
    arabicName: dish.arabicName,
    availabilities: dish.availabilities,
    available: dish.available,
    categoryIds: dish.categoryIds,
    description: dish.description,
    discountEndDate: dish.discountEndDate,
    discountId: dish.discountId,
    discountIsAvailable: dish.discountIsAvailable,
    discountPercent: dish.discountPercent,
    discountStartDate: dish.discountStartDate,
    favorites: dish.favorites,
    id: dish.id,
    imageUrl: dish.imageUrl,
    isConfigurable: dish.isConfigurable,
    isSoldOut: dish.isSoldOut,
    itemExtras: dish.itemExtras,
    name: dish.name,
    preparationTime: dish.preparationTime,
    price: dish.price,
    rank: dish.rank,
  };
}
