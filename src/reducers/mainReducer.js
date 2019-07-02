import userReducer from './userReducer';
import eventReducer from './eventReducer';

const mainReducer = ({ user, event }, action) => {
  // TODO: add any middle ware here

  return {
    user: userReducer(user, action),
    event: eventReducer(event, action)
  };
};

export default mainReducer;
