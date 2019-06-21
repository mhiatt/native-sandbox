import { createStore } from 'redux';

import mainReducer from './reducers/mainReducer';
import initState from './initState.json';


let store = createStore(mainReducer, initState);

export default store;
