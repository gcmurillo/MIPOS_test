const initState = {
    data: null,
    aperture_block: false,
    close_block: true,
    getting_open: false
}

const data_getted = {
    "id": 1068,
    "employee_id_open": 4,
    "employee_id_close": null,
    "date_open": "2019-06-11",
    "hour_open": "12:45:00",
    "date_close": null,
    "hour_close": null,
    "value_previous_close": 6280,
    "value_open": 100,
    "value_close": null,
    "observation": "",
    "synced_id": null,
    "total_expenses": 0,
    "expenses": []
}

const rootReducer = (state = initState, action) => {
    console.log(action);
    switch (action.type)  {
        case 'GET_OPEN':
            return {
                ...state,
                getting_open: true
            }
        case 'GET_OPEN_SUCESS':
            return {
                ...state,
                data: action.data,
                getting_open: false
            }
        case 'CHANGE_DATA':
            let val = action.type_input === 'number' ? +action.value : action.value;
            let assign = {[action.key]: val};
            let new_data = Object.assign({}, state.data, assign);
            return {
                ...state,
                data: new_data
            }
        case 'SUBMIT_OPEN_SUCESS':
            return {
                ...state,
                aperture_block: true
            }
        default:
            return state;
    } 
}

export default rootReducer;