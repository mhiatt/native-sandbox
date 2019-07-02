const actionTypes = {
  GET_USER: 'GET_USER',
  SET_USER_LOCATION: 'SET_USER_LOCATION'
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_USER: {
      return {
        ...state,
        lastName: 'Adams'
      };
    }
    case actionTypes.SET_USER_LOCATION: {
      return {
        ...state,
        location: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export function setUserLocation(locationData) {
  console.log('seUserLocation');
  return {
    type: actionTypes.SET_USER_LOCATION,
    payload: locationData
  };
}

export default userReducer;
