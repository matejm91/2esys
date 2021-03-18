import * as Actions from 'redux/actions/airports.js'

//reducer
const airportsReducer = (state = {}, action) => {
  switch (action.type) {
    case Actions.AIRPORTS_FETCH: {
      return {
        ...state,
        airports: [...action.airports],
      }
    }

    case Actions.AIRPORT_FETCH: {
      return {
        ...state,
        airport: action.airport[0],
      }
    }

    default:
      return state;
  }
};

export default airportsReducer;