import {call, put} from 'redux-saga/effects';
import {requestGetMenu} from '../requests/restaurantsMenu';
import {Dish,Group,Category} from '../../../models/restaurantsMenuModels';
import {SET_RESTAURANTS_MENU} from '../../restaurants';
export function* handleGetMenu() {
  
  try {
    const response = yield call(requestGetMenu);
    const {dishes,groups,categories} = response.data;
    
   
    let dishesData=[];
   
    for(let i in dishes){
      
      const {arabicDescription, arabicName, availabilities, available, categoryIds, description, discountEndDate, discountId, discountIsAvailable, discountPercent, 
        discountStartDate, favorites, id, imageUrl, isConfigurable, isSoldOut, itemExtras, name, preparationTime, price, rank} =dishes[i];
      dishesData.push({ arabicDescription, arabicName, availabilities, available, categoryIds, description, discountEndDate, discountId, discountIsAvailable, discountPercent, 
        discountStartDate, favorites, id, imageUrl, isConfigurable, isSoldOut, itemExtras, name, preparationTime, price, rank})
    }
    let groupsData=[];
    for(let i in groups){
      const {arabicName, availabilities, available,displayMenu,endTime,id,imageUrl,name,rank,startTime } =groups[i];
      groupsData.push({ arabicName,availabilities,available,displayMenu,endTime,id,imageUrl,name,rank,startTime})
    }
    let categoriesData=[];
    for(let i in categories){
      const {arabicName, available, groupIds,id,maxSelectionNumber,name,rank} =categories[i];
      categoriesData.push({ arabicName,available,groupIds,id,maxSelectionNumber,name,rank})
    }
    let menuData={dishes:dishesData,groups:groupsData,categories:categoriesData}
  
    yield put({type: SET_RESTAURANTS_MENU,menuData});
  } catch (error) {
    throw new Error(error.message);
  }
}
