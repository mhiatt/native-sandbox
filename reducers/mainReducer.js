import userReducer from './userReducer';

const mainReducer = ({ user }, action) => {
  // TODO: add any middle ware here

  return {
    user: userReducer(user, action)
  };
};

export default mainReducer;
