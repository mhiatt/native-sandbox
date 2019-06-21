const actionTypes = {
  GET_USER: 'GET_USER'
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_USER: {
      return {
        ...state,
        lastName: 'Adams'
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
