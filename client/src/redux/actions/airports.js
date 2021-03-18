import * as services from 'redux/services/services.js';

export const AIRPORTS_FETCH = 'AIRPORTS_FETCH';
export const AIRPORT_FETCH = 'AIRPORT_FETCH';
export const AIRPORT_CREATE = 'AIRPORT_CREATE';
export const AIRPORT_UPDATE = 'AIRPORT_UPDATE';
export const AIRPORT_DELETE = 'AIRPORT_DELETE';

export const fetchAirports = () => {
  return dispatch => {
    services.get('airports')
    .then(res => res.json())
    .then(airports => dispatch({
      type: AIRPORTS_FETCH,
      airports: airports
    }))
    .catch(err => console.log(err))
  }
}

export const fetchAirportById = id => {
  return dispatch => {
    services.get(`airport/${id}`)
    .then(res => res.json())
    .then(airport => dispatch({
      type: AIRPORT_FETCH,
      airport: airport
    }))
  }
}

export const createAirport = payload => {
  return dispatch => {
    services.post('airports', payload)
    .then(res => {
      dispatch({type: AIRPORT_CREATE})
      dispatch(fetchAirports());
    })
  }
}

export const updateAirport = (id, payload) => {
  return dispatch => {
    services.put(`airport/${id}`, payload)
    .then(res => {
      dispatch({type: AIRPORT_UPDATE})
      dispatch(fetchAirports());
    })
  }
}

export const deleteAirport = id => {
  return dispatch => {
    services.deleteItem(`airport/${id}`)
    .then(res => {
      dispatch({type: AIRPORT_DELETE});
      dispatch(fetchAirports());
    })
  }
}