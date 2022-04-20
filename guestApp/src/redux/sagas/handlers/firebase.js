import Firebase from '../../../firebase/firebase';
import {dummyRestaurantFirebase} from '../../../firebase/firebaseConfig'
export function* configureFirebase(){
    Firebase.configurate(dummyRestaurantFirebase.restaurantId,dummyRestaurantFirebase.branchId,dummyRestaurantFirebase.menuId,dummyRestaurantFirebase.menuConstraintId);
    
}
