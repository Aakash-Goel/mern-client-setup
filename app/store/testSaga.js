/**
 * testSaga.js
 *
 * This is just a test saga.
 *
 * >>>Delete this file.
 *
 */

export default function* testSaga(action) {
  try {
    yield `example - ${action}`;
  } catch (err) {
    // yield put(globalDataFailure(err));
  }
}
