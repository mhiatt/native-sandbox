const actionTypes = {
  GET_EVENTS_SUCCESS: 'GET_EVENTS_SUCCESS'
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_EVENTS_SUCCESS: {
      return {
        ...state,
        publicEvents: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export function getEventsSuccess (events) {
  return {
    type: actionTypes.GET_EVENTS_SUCCESS,
    payload: events
  };
}

export default eventReducer;
