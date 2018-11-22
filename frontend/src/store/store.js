import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducers/";
import promise from "redux-promise";
const initialState = {};

//const middleware = [thunk];

/* const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__()
  )
); */

//middleware settings
// To resolve promise to store we use apply
const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//This can be changed when state is being persisted
//const store = createStore(reducer, stateLoader.loadState(), composePlugin(applyMiddleware(promise,thunk)));
const store = createStore(rootReducer ,{},  composePlugin(applyMiddleware(promise,thunk)));
export default store;
