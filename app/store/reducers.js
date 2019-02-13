import { combineReducers } from 'redux';
import count from './test';

const rootReducer = injectedReducers => {
  return combineReducers({
    count,
    ...injectedReducers,
  });
};

export default rootReducer;
