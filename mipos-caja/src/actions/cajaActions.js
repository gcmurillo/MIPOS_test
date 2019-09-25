import { cajaService } from '../_services/caja.service';
import caja from '../components/caja';
import axios from 'axios';
import { 
    baseURL, 
    getCajaEndpoint, 
    postCajaOpenEndpoint,
} from '../config/config';

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
                dispatch(getOpenSucess(res));
            }
        ).catch(
            (err) => {
                console.log(err);
                dispatch(getOpenError());
            }
        )
    }
}

export const postCajaOpen = (data) => {
    return (dispatch) => {
        dispatch(submitOpen())
        return axios.post(baseURL + postCajaOpenEndpoint, data, config).then(
            (res) => {
                alert('Caja abierta con exito');
                dispatch(submitOpenSucess(res))
            }
        ).catch(
            (err) => {
                alert(err);
                console.log(err);
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

export const getOpenError = () => {
    return {
        type: 'GET_OPEN_ERROR'
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

export const submitOpenSucess = (res) => {
    return {
        type: 'SUBMIT_OPEN_SUCESS',
        data: res.data.results
    }
}