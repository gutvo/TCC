import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from './slice'
import { api } from '@Services/backendApi'
import {
  createAnimalDTO,
  fetchAnimalDTO,
  showAnimalDTO,
  FetchAction,
  createAction,
  showAction,
  updateAnimalDTO,
  updateAction,
  deleteActions,
  FetchRandomAnimalAction,
  fetchRandomAnimalDTO,
} from '@Interfaces/redux/animals'
import { toast } from 'react-toastify'
import axios from 'axios'
import { actions as userActions } from '@Redux/users/slice'

const { choiceCity } = userActions

function* listAnimals({ payload }: FetchAction) {
  const { listAnimalFailure, listAnimalSuccess } = actions
  const { limit, offset, ongId, city, filter } = payload

  try {
    const animals: fetchAnimalDTO = yield api.get('/animal', {
      params: {
        offset,
        limit,
        ongId,
        city,
        filter,
      },
    })
    const result = animals.data

    yield put(choiceCity(city))
    yield put(listAnimalSuccess(result.data, result.pagination, filter))
  } catch (error) {
    yield put(listAnimalFailure())
  }
}

function* createAnimal({ payload }: createAction) {
  const { createAnimalSuccess, createtAnimalFailure } = actions
  const { data } = payload

  const animalData = { ...data, imageData: data.imageData[0] }

  try {
    const response: createAnimalDTO = yield api.post('/animal', {
      ...animalData,
    })

    yield put(createAnimalSuccess())
    toast.success(response.data.message)
  } catch (error) {
    yield put(createtAnimalFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* showAnimal({ payload }: showAction) {
  const { showAnimalSuccess, showAnimalFailure } = actions
  try {
    const animal: showAnimalDTO = yield api.get(`animal/${payload.id}`)

    const { data } = animal
    console.log(data)

    let animalData
    if (data.data.image) {
      const image: string = yield api
        .get(`/animal/images/${data.data.id}`, {
          responseType: 'blob',
        })
        .then((response) => {
          return URL.createObjectURL(response.data)
        })
      animalData = { ...data.data, previewImage: image }
    } else {
      animalData = { ...data.data, previewImage: undefined }
    }

    yield put(showAnimalSuccess(animalData))
  } catch (error) {
    yield put(showAnimalFailure())
  }
}

function* updateAnimal({ payload }: updateAction) {
  const { updateAnimalSuccess, updateAnimalFailure } = actions
  const { data } = payload

  const animalData = {
    ...data,
    imageData: data.imageData[0],
  }

  try {
    const response: updateAnimalDTO = yield api.put('/animal', {
      ...animalData,
    })

    yield put(updateAnimalSuccess(data))
    toast.success(response.data.message)
  } catch (error) {
    yield put(updateAnimalFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* deleteAnimal({ payload }: deleteActions) {
  const { deleteAnimalSuccess, deleteAnimalFailure } = actions
  const { id, navigation } = payload
  try {
    const response: updateAnimalDTO = yield api.delete('/animal', {
      params: { id },
    })

    yield put(deleteAnimalSuccess())

    navigation('/animals')

    toast.success(response.data.message)
  } catch (error) {
    yield put(deleteAnimalFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* listRandomAnimals({ payload }: FetchRandomAnimalAction) {
  const { listRandomAnimalFailure, listRandomAnimalSuccess } = actions
  const { city, ongId } = payload
  try {
    const animals: fetchRandomAnimalDTO = yield api.get('/random/animal', {
      params: { city, ongId },
    })
    const result = animals.data

    yield put(listRandomAnimalSuccess(result.data))
  } catch (error) {
    yield put(listRandomAnimalFailure())
  }
}

export default all([
  takeLatest(actions.listAnimalRequest.type, listAnimals),
  takeLatest(actions.createAnimalRequest.type, createAnimal),
  takeLatest(actions.showAnimalRequest.type, showAnimal),
  takeLatest(actions.updateAnimalRequest.type, updateAnimal),
  takeLatest(actions.deleteAnimalRequest.type, deleteAnimal),
  takeLatest(actions.listRandomAnimalRequest.type, listRandomAnimals),
])
