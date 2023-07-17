import { put, call, takeLatest, all } from 'redux-saga/effects'
import { actions } from './slice'
import { getAnimals, getAnimalImage } from '../../services/apiAnimal'

interface Animal {
  id: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: number
  image: boolean
  imagesData: File | null
}

interface AnimalData {
  data: Animal[]
  pagination: {
    offset: number
    limit: number
    count: number
  }
}

interface FetchAnimalsAction {
  type: typeof actions.getAnimalRequest.type
  payload: {
    offset: number
    limit: number
  }
}

function* fetchAnimals({ payload }: FetchAnimalsAction) {
  const { getAnimalFailure, getAnimalSuccess } = actions
  const { limit, offset } = payload
  try {
    const animals: AnimalData = yield call(getAnimals, limit, offset)
    const result: Animal[] = yield call(getAnimalImage, animals.data)
    yield put(getAnimalSuccess(result, animals.pagination))
  } catch (error) {
    yield put(getAnimalFailure)
  }
}

export default all([takeLatest('animals/getAnimalRequest', fetchAnimals)])
