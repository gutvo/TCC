import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from './slice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { api } from '@Services/backendApi'
import { listActions, listOngDTO, showActions } from '@Interfaces/redux/ongs'
import { OngDataDTO } from '@Interfaces/redux/users'

function* listOng({ payload }: listActions) {
  const { listOngFailure, listOngSuccess } = actions
  const { offset, limit, filter, city } = payload
  try {
    const list: listOngDTO = yield api.get('/ongs', {
      params: { offset, limit, filter, city },
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
    const ong: OngDataDTO = yield api.get('/ong', {
      params: { id },
    })

    const data = ong.data.data.userData
    if (data.image) {
      const image: string = yield api
        .get(`/user/images/${data.email}`, {
          responseType: 'blob',
        })
        .then((response) => {
          return URL.createObjectURL(response.data)
        })
      data.previewImage = image
    } else {
      data.previewImage = ''
    }
    yield put(showOngSuccess(ong.data.data))
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
