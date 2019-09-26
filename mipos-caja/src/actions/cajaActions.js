import { cajaService } from '../_services/caja.service';
import caja from '../components/caja';
import axios from 'axios';
import { 
    baseURL, 
    getCajaEndpoint, 
    postCajaOpenEndpoint,
    getCajaCloseEndpoint,
    postCajaCloseEndpoint,
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
                dispatch(getOpenSuccess(res));
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
                dispatch(submitOpenSuccess(res))
            }
        )
        .then(
            dispatch(getCajaClose())
        )
        .catch(
            (err) => {
                dispatch(submitOpenError());
                console.log(err);
            }
        )
    }
}

export const getCajaClose = () => {
    return (dispatch) => {
        dispatch(getClose())
        return axios.get(baseURL + getCajaCloseEndpoint, config).then(
            (res) => {
                dispatch(getCloseSuccess(res))
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        )
    }
}

export const postCajaClose = (data) => {
    console.log(data);
    return (dispatch) => {
        dispatch(postClose())
        return axios.post(baseURL + postCajaCloseEndpoint, data, config).then(
            (res) => {
                console.log(res);
                dispatch(postCloseSuccess())
            }
        ).catch((err) => {
            console.log(err);
            dispatch(postCloseError())
        })
    }
}

export const getOpen = () => {
    return {
        type: 'GET_OPEN'
    }
}

export const getOpenSuccess = (res) => {
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

export const changeDataOpen = (key, value, type) => {
    return {
        type: 'CHANGE_DATA_OPEN',
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

export const submitOpenError = () => {
    return {
        type: 'SUBMIT_OPEN_ERROR',
    }
}

export const submitOpenSuccess = (res) => {
    return {
        type: 'SUBMIT_OPEN_SUCCESS',
        data: res.data.results
    }
}

export const getClose = () => {
    return {
        type: 'GET_CLOSE'
    }
}

export const getCloseSuccess = (res) => {
    return {
        type: 'GET_CLOSE_SUCCESS',
        data: res.data
    }
}

export const addGasto = () => {
    return {
        type: 'ADD_GASTO'
    }
}

export const changeGasto = (id, name, value, type) => {
    return {
        type: 'CHANGE_GASTO',
        name: name,
        value: value,
        type_input: type,
        idx: id
    }
}

export const removeGasto = (id) => {
    return {
        type: 'REMOVE_GASTO',
        idx: id
    }
}

export const postClose = () => {
    return {
        type: 'POST_CLOSE'
    }
}

export const postCloseSuccess = () => {
    return {
        type: 'POST_CLOSE_SUCCESS'
    }
}

export const postCloseError = () => {
    return {
        type: 'POST_CLOSE_ERROR'
    }
}