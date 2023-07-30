import { all } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import animalSaga from './animals/saga'
import userSaga from './users/saga'

export default function* rootSaga(): SagaIterator<void> {
  return yield all([animalSaga, userSaga])
}
