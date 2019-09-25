import { cajaService } from '../_services/caja.service';
import caja from '../components/caja';
import axios from 'axios';
import { baseURL, getCajaEndpoint } from '../config/config';

const AuthStr = 'Bearer '.concat(localStorage.getItem('token'));
const config = {
    headers: {
        Authorization: AuthStr
    }
};

export const requestCajaData = () => {
    return (dispatch) => {
        dispatch(getOpen())
        return axios.get(baseURL + getCajaEndpoint, config).then(
            (res) => {
                console.log(res);
                dispatch(getOpenSucess(res));
            }
        )
    }
}

export const getOpen = () => {
    return {
        type: 'GET_OPEN'
    }
}

export const getOpenSucess = (res) => {
    return {
        type: 'GET_OPEN_SUCESS',
        data: res.data.results
    }
}

export const changeData = (key, value, type) => {
    return {
        type: 'CHANGE_DATA',
        key: key,
        value: value,
        type_input: type
    }
}

export const submitOpen = () => {
    return {
        type: 'SUBMIT_OPEN',
    }
}

export const submitOpenSucess = () => {
    return {
        type: 'SUBMIT_OPEN_SUCESS',
    }
}