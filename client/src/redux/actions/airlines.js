import * as services from 'redux/services/services.js';

export const AIRLINES_FETCH = 'AIRLINES_FETCH';
export const AIRLINE_FETCH = 'AIRLINE_FETCH';
export const AIRLINE_CREATE = 'AIRLINE_CREATE';
export const AIRLINE_UPDATE = 'AIRLINE_UPDATE';
export const AIRLINE_DELETE = 'AIRLINE_DELETE';

export const fetchAirlines = () => {
  return dispatch => {
    services.get('airlines')
    .then(res => res.json())
    .then(airlines => dispatch({
      type: AIRLINES_FETCH,
      airlines: airlines
    }))
    .catch(err => console.log(err))
  }
}

export const fetchAirlineById = id => {
  return dispatch => {
    services.get(`airline/${id}`)
    .then(res => res.json())
    .then(airline => dispatch({
      type: AIRLINE_FETCH,
      airline: airline
    }))
  }
}

export const createAirline = payload => {
  return dispatch => {
    services.post('airlines', payload)
    .then(res => {
      dispatch({type: AIRLINE_CREATE})
      dispatch(fetchAirlines());
    })
  }
}

export const updateAirline = (id, payload) => {
  return dispatch => {
    services.put(`airline/${id}`, payload)
    .then(res => {
      dispatch({type: AIRLINE_UPDATE})
      dispatch(fetchAirlines());
    })
  }
}

export const deleteAirline = id => {
  return dispatch => {
    services.deleteItem(`airline/${id}`)
    .then(res => {
      dispatch({type: AIRLINE_DELETE});
      dispatch(fetchAirlines());
    })
  }
}