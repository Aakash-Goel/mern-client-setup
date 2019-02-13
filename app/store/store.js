import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

// Choose compose method depending upon environment and platform
const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object'
    ? composeWithDevTools
    : compose;

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

export default configureStore;
