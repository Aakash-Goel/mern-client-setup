import { all } from 'redux-saga/effects';
import isFunction from 'lodash/fp/isFunction';

export function* testSaga(action) {
  try {
    yield `example - ${action}`;
  } catch (err) {
    // yield put(globalDataFailure(err));
  }
}

export const runSagas = sagas => {
  if (Array.isArray(sagas)) {
    return sagas.map(saga => saga());
  }

  if (isFunction(sagas)) {
    return Array.of(sagas());
  }

  throw new TypeError(`${sagas} should be an Array or Function`);
};

export default function* rootSaga() {
  try {
    const allSagas = [...runSagas(testSaga)];
    yield all(allSagas);
  } catch (err) {
    // yield put(globalDataFailure(err));
  }
}
