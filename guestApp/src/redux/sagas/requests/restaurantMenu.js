
import Firebase from '../../../firebase/firebase';
export async function requestGetMenu(){
  
    return await Firebase.menuDatabase.ref(`viewStore/${ Firebase.restaurantId }/menus/${Firebase.menuId}`).once('value')

    
    
 

}