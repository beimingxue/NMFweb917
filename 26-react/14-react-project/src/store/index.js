
import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducer.js';


const logger = createLogger({});
const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') {
    
    middlewares.push(logger);
    //console.log('nmf',middlewares.push(logger));
}

const store = createStore(reducer,applyMiddleware(...middlewares));
console.log(store);

export default store;