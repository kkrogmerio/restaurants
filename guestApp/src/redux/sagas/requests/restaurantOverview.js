
import Firebase from '../../../firebase/firebase';
export async function requestGetOverview(){
  
    return await Firebase.overviewDatabase.ref(`/about-us`).once('value');

    
    
 

}