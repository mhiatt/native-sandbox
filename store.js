import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import mainReducer from './reducers/mainReducer';
import initState from './initState.json';


let store = createStore(
  mainReducer,
  initState,
  composeWithDevTools(applyMiddleware())
);

export default store;
