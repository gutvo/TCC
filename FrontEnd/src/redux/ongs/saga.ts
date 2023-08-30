import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from './slice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { api } from '@Services/backendApi'
import { listActions, listOngDTO, showActions } from '@Interfaces/redux/ongs'
import { OngDataDTO } from '@Interfaces/redux/users'

function* listOng({ payload }: listActions) {
  const { listOngFailure, listOngSuccess } = actions
  const { offset, limit } = payload
  try {
    const list: listOngDTO = yield api.get('/ongs', {
      params: { offset, limit },
    })
    yield put(listOngSuccess(list))
  } catch (error) {
    yield put(listOngFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* showOng({ payload }: showActions) {
  const { showOngFailure, showOngSuccess } = actions
  const { id } = payload
  try {
    const data: OngDataDTO = yield api.get('/ong', {
      params: { id },
    })
    yield put(showOngSuccess(data.data.data))
  } catch (error) {
    yield put(showOngFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

export default all([
  takeLatest(actions.listOngRequest.type, listOng),
  takeLatest(actions.showOngRequest.type, showOng),
])
