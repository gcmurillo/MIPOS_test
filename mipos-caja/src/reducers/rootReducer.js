const initState = {
    data_open: null,                // datos de apertura
    data_close: null,               // datos de cierre
    aperture_block: false,          // bloquear formulario apertura
    close_block: true,              // bloquear formulario cierre
    getting_open: false,            // GET request de datos apertura
    get_open_error: false,          // Error al GET datos apertura
    submit_open: false,             // POST datos apertura
    submit_open_error: false,       // Error POST datos apertura
    getting_close: false,           // GET request datos cierre
    get_close_error: false,         // Error GET datos cierre
    posting_close: false,           // POST request de datos clausura
    posting_close_success: false,   // Exito al post clausura
    posting_close_error: false,     // Error al POST clausura
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
                data_open: data,
                getting_open: false,
                aperture_block: false,
                get_open_error: false,
                close_block: true,
                posting_close_success: false,
                posting_close_error: false,
            }
        case 'GET_OPEN_ERROR':
            return {
                ...state,
                getting_open: false,
                get_open_error: true
            }
        case 'CHANGE_DATA_OPEN':
            let val = action.type_input === 'number' ? +action.value: action.value;
            let assign = {[action.key]: val};
            let new_data = Object.assign({}, state.data_open, assign);
            return {
                ...state,
                data_open: new_data
            }
        case 'SUBMIT_OPEN':
            return {
                ...state,
                submit_open: true
            }
        case 'SUBMIT_OPEN_ERROR':
            return {
                ...state,
                submit_open_error: true
            }
        case 'SUBMIT_OPEN_SUCCESS':
            let result = {
                date_open: action.data.date_open,
                hour_open: action.data.hour_open,
                value_previous_close: action.data.value_previous_close,
                value_open: action.data.value_open / 100,
                observation: action.data.observation
            }
            let curr = new Date();
            curr.setDate(curr.getDate());
            var date = curr.toISOString().substr(0,10);
            let time = curr.toLocaleTimeString('it-IT');
            let close_data = {
                date_close: date,
                hour_close: time
            }
            return {
                ...state,
                data_open: result,
                data_close: close_data,
                aperture_block: true,
                submit_open: false, 
                submit_open_error: false,
                close_block: false
            }
        case 'GET_CLOSE':
            return {
                ...state,
                getting_close: true
            }
        case 'GET_CLOSE_SUCCESS':
            let data_close = Object.assign({}, state.data_close, action.data, {expenses: [], sum_gastos: 0});
            return {
                ...state,
                data_close: data_close,
                getting_close: false
            }
        case 'ADD_GASTO':
            let new_expenses = state.data_close.expenses;
            new_expenses.push({name: 'Motivo ' + (new_expenses.length + 1), value: 0});
            let data_with_new = Object.assign({}, state.data_close, {expenses: new_expenses});
            console.log(data_with_new);
            return {
                ...state,
                data_close: data_with_new
            }
        case 'CHANGE_GASTO':
            const key = action.name;
            const gastos = state.data_close.gastos;
            const value = action.type_input === "number" ? +action.value : action.value;
            const newExpenses = state.data_close.expenses.map((item, sidx) => {
                if (sidx !== action.idx) {
                    return item;
                } 
                return {...item, [key]: value};
                
            })
            let sum = 0;
            for (let i = 0; i < newExpenses.length; i++) {
                sum += newExpenses[i]['value'];
            }
            let new_data_close = Object.assign({}, state.data_close, {expenses: newExpenses, sum_gastos: sum*100});
            return {
                ...state,
                data_close: new_data_close
            }
        case 'REMOVE_GASTO':
            const notRemoved = state.data_close.expenses.filter((item, sidx) => (action.idx !== sidx));
            let sum_expenses = 0;
            for (let i = 0; i < notRemoved.length; i++) {
                sum_expenses += notRemoved[i]['value'];
            }
            let data_close_not_removed = Object.assign({}, state.data_close, {expenses: notRemoved, sum_gastos: sum_expenses*100})
            return {
                ...state,
                data_close: data_close_not_removed
            }
        case 'POST_CLOSE':
            return {
                ...state,
                posting_close: true
            }
        case 'POST_CLOSE_SUCCESS':
            return {
                ...state,
                posting_close: false,
                posting_close_success: true,
                data_open: null,
                data_close: null
            }
        case 'POST_CLOSE_ERROR':
            return {
                ...state,
                posting_close_error: true,
                posting_close: false
            }
        default:
            return state;
    } 
}

export default rootReducer;