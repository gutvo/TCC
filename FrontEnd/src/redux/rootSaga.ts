import { all } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import AnimalSaga from './animals/saga'

export default function* rootSaga(): SagaIterator<void> {
  return yield all([AnimalSaga])
}
