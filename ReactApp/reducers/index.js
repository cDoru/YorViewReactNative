/*
 Combine All Reducers
 */
'use strict';

import { combineReducers } from 'redux'

// Our custom reducers
// We need to import each one here and add them to the combiner at the bottom
import sideMenu from './sidemenu'
import getFund from './fundamentalOneRed'
import getHis from './getHistoricalReducer'
import tradeReducer from './tradeReducer'
import profileReducer from './profileReducer'

// Combine all
const appReducer = combineReducers({
  sideMenu,
  getFund,
  getHis,
  tradeReducer,
  profileReducer,
});

// Setup root reducer
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer
