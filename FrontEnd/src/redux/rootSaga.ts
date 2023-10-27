import { all } from 'redux-saga/effects'
import { SagaIterator } from 'redux-saga'
import animalSaga from './animals/saga'
import userSaga from './users/saga'
import ongSaga from './ongs/saga'
import adoptionSaga from './adoptions/saga'

export default function* rootSaga(): SagaIterator<void> {
  return yield all([animalSaga, userSaga, ongSaga, adoptionSaga])
}
