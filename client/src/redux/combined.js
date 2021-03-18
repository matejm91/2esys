import {combineReducers} from 'redux';
import airlinesReducer from 'redux/reducers/airlines.js';
import airportsReducer from 'redux/reducers/airports.js';
import countriesReducer from 'redux/reducers/countries.js';

export default combineReducers({
  airlinesReducer,
  airportsReducer,
  countriesReducer
});