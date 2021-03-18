import * as Actions from 'redux/actions/countries.js';

//reducer
const countriesReducer = (state = {}, action) => {
  switch (action.type) {
    case Actions.COUNTRIES_FETCH: {
      return {
        ...state,
        countries: [...action.countries],
      }
    }

    case Actions.COUNTRY_FETCH: {
      return {
        ...state,
        country: action.country[0],
      }
    }

    default:
      return state;
  }
};

export default countriesReducer;