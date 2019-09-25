import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import  thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'; 

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'));

localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI5OGYyOGQ5YWU5ODExY2ZjNTYzZDMwMWNmODA2NGMxNDgxZDFkYjVjODQ5YjQ0YmRkYmM4OGQwMmY5MmYxNDU4ZWJkMWU0OGY5ZmZjNWM2In0.eyJhdWQiOiIxIiwianRpIjoiMjk4ZjI4ZDlhZTk4MTFjZmM1NjNkMzAxY2Y4MDY0YzE0ODFkMWRiNWM4NDliNDRiZGRiYzg4ZDAyZjkyZjE0NThlYmQxZTQ4ZjlmZmM1YzYiLCJpYXQiOjE1NjkzODIyMDgsIm5iZiI6MTU2OTM4MjIwOCwiZXhwIjoxNjAxMDA0NjA4LCJzdWIiOiI0Iiwic2NvcGVzIjpbImVtcGxveWVlIl19.R6kWJt1iC3o75wRpTj7KNw_8g5UpiGx3dEaO5b56EH50LzAS5YTgv9tR_i9LwMcEju1vWWHLzFB4Sg8SQ8Y6DNWm85LkabbaFhmuOAmX-5ZUxV36FGzaavBdmS4p-P9n7rUTdSrfeiCFzgbnNi1wrqDwyimrqanIXwwdEEArJjIAs8pWF872IxA5DZbSvuYrFNCEFT0_ZvmqCCoVpRRp5dVam96Yu-610_lHNHoYPwWt9pF8A7Wevrrdzb0CvUXFf52ypwoBM-c76tWD9xGmN50UadbfgKlLfdIJ4FekjSSAicnywYxJ3woGTyR3KVbTJ6erSfcEAJFQM0tY4_YmmvJwm07TXgTOJHJ5D6TiaUBKrsBqD2_oUthuXRGee9RKQ5IYyZP8QnXCqo-fI97CK6gm-Ba7TpSR3Fbdr3RfI9gHHeqvKrv6dPw6CbgQ9u5icHia4TPy4SNU28AbeViqqZcOgjSLoxr-ocsKSCzW_M9vSSXvf1u2J0bme9zwEDmgevTsodL_PvPo11FqD_kyiz_3v17Za5zM0Ey2-owrsDeHgwK0UGyat8LWj-BM0VguBHb_kBLMBZZ-FnxNG1r5gLREjvS_O7VcsrZ1TDsPzS08c2NOjJsLCOskoP71VqV4TbdFFqh5MGO4DZRWH67CI43Aw-mGUZ5SI2AD6B7TAkw')

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
