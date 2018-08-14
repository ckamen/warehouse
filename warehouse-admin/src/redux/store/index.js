import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

// reducers
import appAllReducers from '../reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    appAllReducers,
    composeEnhancers(
        applyMiddleware(thunkMiddleware)
    )
);

export default store;