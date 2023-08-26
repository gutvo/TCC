import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from './slice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { api } from '@Services/backendApi'
import { listActions, listOngDTO } from '@Interfaces/redux/ongs'

function* listOng({ payload }: listActions) {
  const { listOngFailure, listOngSuccess } = actions
  const { offset, limit } = payload
  try {
    const list: listOngDTO = yield api.get('/ong', {
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

export default all([takeLatest(actions.listOngRequest.type, listOng)])
