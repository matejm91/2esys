import * as services from 'redux/services/services.js';

export const COUNTRIES_FETCH = 'COUNTRIES_FETCH';
export const COUNTRY_FETCH = 'COUNTRY_FETCH';
export const COUNTRY_CREATE = 'COUNTRY_CREATE';
export const COUNTRY_UPDATE = 'COUNTRY_UPDATE';
export const COUNTRY_DELETE = 'COUNTRY_DELETE';

export const fetchCountries = () => {
  return dispatch => {
    services.get('countries')
    .then(res => res.json())
    .then(countries => dispatch({
      type: COUNTRIES_FETCH,
      countries: countries
    }))
    .catch(err => console.log(err))
  }
}

export const fetchCountryById = id => {
  return dispatch => {
    services.get(`country/${id}`)
    .then(res => res.json())
    .then(country => dispatch({
      type: COUNTRY_FETCH,
      country: country
    }))
  }
}

export const createCountry = payload => {
  return dispatch => {
    services.post('countries', payload)
    .then(res => {
      dispatch({type: COUNTRY_CREATE})
      dispatch(fetchCountries());
    })
  }
}

export const updateCountry = (id, payload) => {
  return dispatch => {
    services.put(`country/${id}`, payload)
    .then(res => {
      dispatch({type: COUNTRY_UPDATE})
      dispatch(fetchCountries());
    })
  }
}

export const deleteCountry = id => {
  return dispatch => {
    services.deleteItem(`country/${id}`)
    .then(res => {
      dispatch({type: COUNTRY_DELETE});
      dispatch(fetchCountries());
    })
  }
}