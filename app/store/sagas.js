/**
 * sagas.js
 *
 * Root saga where all your sagas are imported here and
 * added to the application
 *
 */

/**
 * Module dependencies.
 */
import { all } from 'redux-saga/effects';
import isFunction from 'lodash/fp/isFunction';

/**
 * Import all your applications sagas here
 */
import testSaga from './testSaga'; // >>>Delete this

/**
 * Module variables.
 * @private
 */
const runSagas = sagas => {
  if (Array.isArray(sagas)) {
    return sagas.map(saga => saga());
  }

  if (isFunction(sagas)) {
    return Array.of(sagas());
  }

  throw new TypeError(`${sagas} should be an Array or Function`);
};

/**
 * Module exports.
 * @public
 */
export default function* rootSaga() {
  try {
    // add your sagas here comma seperated inside `runSagas`
    // >>>Delete `testSaga`
    const allSagas = [...runSagas(testSaga)];
    yield all(allSagas);
  } catch (err) {
    // yield put(globalDataFailure(err));
  }
}
