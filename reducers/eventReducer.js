const actionTypes = {
  GET_EVENTS_SUCCESS: 'GET_EVENTS_SUCCESS',
  INSERT_PUBLIC_EVENT: 'INSERT_PUBLIC_EVENT'
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_EVENTS_SUCCESS: {
      return {
        ...state,
        publicEvents: action.payload
      };
    }
    case actionTypes.INSERT_PUBLIC_EVENT: {
      const newPublicEventsList = state.publicEvents.concat(new Array(payload));

      return {
        ...state,
        publicEvents: newPublicEventsList
      };
    }
    default: {
      return state;
    }
  }
};

export function getEventsSuccess(events) {
  return {
    type: actionTypes.GET_EVENTS_SUCCESS,
    payload: events
  };
}

export function insertPublicEvent(newPublicEvent) {
  return {
    type: actionTypes.INSERT_PUBLIC_EVENT,
    payload: newPublicEvent
  };
}

export default eventReducer;
