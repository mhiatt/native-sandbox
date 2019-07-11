const actionTypes = {
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_LOCATION_SUCCESS: 'GET_USER_LOCATION_SUCCESS'
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case actionTypes.GET_USER_LOCATION_SUCCESS: {
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

export function getUserLocationSuccess(locationData) {
  console.log('seUserLocation');
  return {
    type: actionTypes.GET_USER_LOCATION_SUCCESS,
    payload: locationData
  };
}

export function getUserSuccess() {
  return {
    type: actionTypes.GET_USER_SUCCESS
  };
}

export default userReducer;
