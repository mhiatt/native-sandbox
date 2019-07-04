const actionTypes = {
  GET_PUBLIC_EVENTS_SUCCESS: 'GET_PUBLIC_EVENTS_SUCCESS',
  INSERT_PUBLIC_EVENT: 'INSERT_PUBLIC_EVENT',
  GET_PRIVATE_EVENTS_SUCCESS: 'GET_PRIVATE_EVENTS_SUCCESS'
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_EVENTS_SUCCESS: {
      return {
        ...state,
        publicEvents: action.payload
      };
    }
    case actionTypes.GET_PRIVATE_EVENTS_SUCCESS: {
      console.log('PRIVATE EVENTS SUCCCESS');
      return {
        ...state,
        privateEvents: action.payload
      };
    }
    case actionTypes.INSERT_EVENT: {
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

export function getPublicEventsSuccess(events) {
  return {
    type: actionTypes.GET_PUBLIC_EVENTS_SUCCESS,
    payload: events
  };
}

export function getPrivateEventsSuccess(events) {
  return {
    type: actionTypes.GET_PRIVATE_EVENTS_SUCCESS,
    payload: events
  };
}

export function insertEvent(newPublicEvent) {
  return {
    type: actionTypes.INSERT_EVENT,
    payload: newPublicEvent
  };
}

export default eventReducer;
