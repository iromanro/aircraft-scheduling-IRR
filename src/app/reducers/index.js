import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as aircrafts from './aircrafts';
import * as flights from './flights';
import * as scheduler from './scheduler';

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    ...aircrafts,
    ...flights,
    ...scheduler,
  });
};

export default createRootReducer;
