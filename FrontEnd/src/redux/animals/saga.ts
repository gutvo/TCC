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
} from '@Interfaces/redux/animals'
import { toast } from 'react-toastify'
import axios from 'axios'
import { deleteActions, updateAction } from '@Interfaces/redux/users'

function* listAnimals({ payload }: FetchAction) {
  const { listAnimalFailure, listAnimalSuccess } = actions
  const { limit, offset, ongId, city } = payload
  try {
    const animals: fetchAnimalDTO = yield api.get('/animal', {
      params: {
        offset,
        limit,
        ongId,
        city,
      },
    })
    const result = animals.data
    yield put(listAnimalSuccess(result.data, result.pagination))
  } catch (error) {
    yield put(listAnimalFailure())
  }
}

function* createAnimal({ payload }: createAction) {
  const { createAnimalSuccess, createtAnimalFailure } = actions
  const { data, reset } = payload

  try {
    const response: createAnimalDTO = yield api.post('/animal', {
      data,
    })

    yield put(createAnimalSuccess())
    reset()
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
    const response: showAnimalDTO = yield api.get(`animal/${payload.id}`)
    yield put(showAnimalSuccess(response.data))
  } catch (error) {
    yield put(showAnimalFailure())
  }
}

function* updateAnimal({ payload }: updateAction) {
  const { updateAnimalSuccess, updateAnimalFailure } = actions
  const { data } = payload

  try {
    const response: updateAnimalDTO = yield api.put('/animal', {
      data,
    })

    yield put(updateAnimalSuccess(response.data.data))
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

export default all([
  takeLatest(actions.listAnimalRequest.type, listAnimals),
  takeLatest(actions.createAnimalRequest.type, createAnimal),
  takeLatest(actions.showAnimalRequest.type, showAnimal),
  takeLatest(actions.updateAnimalRequest.type, updateAnimal),
  takeLatest(actions.deleteAnimalRequest.type, deleteAnimal),
])
