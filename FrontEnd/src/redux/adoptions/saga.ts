import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from './slice'
import { api } from '@Services/backendApi'
import {
  adoptionActions,
  listAdoptionActions,
  createAdoptionDTO,
  listAdoptionAnimalDTO,
  createAdoptionActions,
  deleteAdoptionActions,
  deleteAdoptionDTO,
} from '@Interfaces/redux/adoptions'
import { toast } from 'react-toastify'
import axios from 'axios'

function* createAdoption({ payload }: createAdoptionActions) {
  const { createAdoptionSuccess, createAdoptionFailure } = actions
  const { animalId, ongId, userId } = payload
  try {
    const response: createAdoptionDTO = yield api.post('/adoption', {
      animalId,
      ongId,
      userId,
    })

    yield put(createAdoptionSuccess())

    toast.success(response.data.message)
  } catch (error) {
    yield put(createAdoptionFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* listAdoption({ payload }: listAdoptionActions) {
  const { listAdoptionFailure, listAdoptionSuccess } = actions
  const { ongId, limit, offset } = payload
  try {
    const response: listAdoptionAnimalDTO = yield api.get('/adoption', {
      params: {
        ongId,
        limit,
        offset,
      },
    })

    const { data, pagination } = response.data

    yield put(listAdoptionSuccess(data, pagination))
  } catch (error) {
    yield put(listAdoptionFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* adopt({ payload }: adoptionActions) {
  const { createAdoptionSuccess, createAdoptionFailure } = actions
  const { adoptionId, fetchAdoptedRequests } = payload
  try {
    const response: createAdoptionDTO = yield api.put('/adoption', {
      adoptionId,
    })

    yield put(createAdoptionSuccess())

    toast.success(response.data.message)

    fetchAdoptedRequests()
  } catch (error) {
    yield put(createAdoptionFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* deleteAdoption({ payload }: deleteAdoptionActions) {
  const { deleteAdoptionFailure, deleteAdoptionSuccess } = actions
  const { adoptionId, fetchAdoptedRequests } = payload
  try {
    const response: deleteAdoptionDTO = yield api.delete('/adoption', {
      params: { adoptionId },
    })

    yield put(deleteAdoptionSuccess())

    toast.success(response.data.message)

    fetchAdoptedRequests()
  } catch (error) {
    yield put(deleteAdoptionFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

export default all([
  takeLatest(actions.createAdoptionRequests.type, createAdoption),
  takeLatest(actions.listAdoptionRequest.type, listAdoption),
  takeLatest(actions.adoptAnimalRequest.type, adopt),
  takeLatest(actions.deleteAdoptionRequest.type, deleteAdoption),
])
