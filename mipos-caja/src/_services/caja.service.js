import axios from 'axios';
import { baseURL } from '../config/config';

export const cajaService = {
    get
}

const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
const config = {
    headers: {
        Authorization: AuthStr
    }
};

function get(apiEndPoint) {
    console.log(baseURL + apiEndPoint);
}