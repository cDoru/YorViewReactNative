/*
 */

import React, { Component } from 'react'
import { applyMiddleware, compose, createStore } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { composeWithDevTools } from './redux-devtools-extension';

import App from './app'

// All redux reducers (rolled into one mega-reducer)
import rootReducer from '../reducers/index'

// Load middleware
let middleware = [
  thunk, // Allows action creators to return functions (not just plain objects)
];


// Init redux store (using the given reducer & middleware)


const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
  rootReducer
});
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware)
));

// Wrap App in Redux provider (makes Redux available to all sub-components)
export default class AppContainer extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
