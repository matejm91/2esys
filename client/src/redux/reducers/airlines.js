import * as Actions from 'redux/actions/airlines.js'

//reducer
const airlinesReducer = (state = {}, action) => {
  switch (action.type) {
    case Actions.AIRLINES_FETCH: {
      return {
        ...state,
        airlines: [...action.airlines],
      }
    }

    case Actions.AIRLINE_FETCH: {
      return {
        ...state,
        airline: action.airline[0],
      }
    }

    default:
      return state;
  }
};

export default airlinesReducer;