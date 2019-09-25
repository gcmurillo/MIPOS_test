const initState = {
    data: null,
    aperture_block: false,
    close_block: true,
    getting_open: false,
    get_open_error: false,
    submit_open: false,
    submit_open_error: false
}

const rootReducer = (state = initState, action) => {
    switch (action.type)  {
        case 'GET_OPEN':
            return {
                ...state,
                getting_open: true
            }
        case 'GET_OPEN_SUCESS':
            let data = {
                date_open: action.data.date_open,
                hour_open: action.data.hour_open,
                value_previous_close: action.data.value_previous_close,
                value_open: action.data.value_open / 100,
                observation: action.data.observation
            }
            return {
                ...state,
                data: data,
                getting_open: false,
                get_open_error: false
            }
        case 'GET_OPEN_ERROR':
            return {
                ...state,
                getting_open: false,
                get_open_error: true
            }
        case 'CHANGE_DATA':
            let val = action.type_input === 'number' ? +action.value: action.value;
            let assign = {[action.key]: val};
            let new_data = Object.assign({}, state.data, assign);
            return {
                ...state,
                data: new_data
            }
        case 'SUBMIT_OPEN':
            return {
                ...state,
                submit_open: true
            }
        case 'SUBMIT_OPEN_SUCESS':
            let result = {
                date_open: action.data.date_open,
                hour_open: action.data.hour_open,
                value_previous_close: action.data.value_previous_close,
                value_open: action.data.value_open / 100,
                observation: action.data.observation
            }
            return {
                ...state,
                data: result,
                aperture_block: true,
                submit_open: false, 
                submit_open_error: false,
                close_block: false
            }
        default:
            return state;
    } 
}

export default rootReducer;