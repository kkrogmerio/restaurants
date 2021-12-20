import axios from 'axios';
export function requestGetRestaurants(){
    return axios.get('https://api.npoint.io/3218e74a871a5c9d25a4');
}