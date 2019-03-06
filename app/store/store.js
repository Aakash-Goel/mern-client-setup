/**
 * store.js
 *
 * Store configurations.
 *
 * Add/Change store middlewares here
 *
 */

/**
 * Module dependencies.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

/**
 * Module variables.
 * @private
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Add/change middleware here
 * @private
 */
const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

/**
 * Choose compose method depending upon environment and platform
 * @private
 */
const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object'
    ? composeWithDevTools
    : compose;

/**
 * @method configureStore
 * @public
 *
 * @returns {Object} store
 */
function configureStore(initialState = {}) {
  const store = createStore(
    reducers(),
    initialState,
    composeEnhancers(...enhancers)
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(sagas);
  };

  store.runSagaTask();

  return store;
}

/**
 * Module exports.
 * @public
 */
export default configureStore;
