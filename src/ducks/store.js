import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
import promiseMiddleWare from 'redux-promise-middleware';

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPONSE__ || compose;
const combined = composeEnhancers(applyMiddleware(promiseMiddleWare()));

export default createStore(reducer, combined);
