import { createStore, applyMiddleware } from 'redux';
import { save, load } from "redux-localstorage-simple"

import rootReducer from './reducers/rootReducer';


const createStoreWithMiddleware = applyMiddleware(save())(createStore)

const store = createStoreWithMiddleware(rootReducer,load());    

export default store;