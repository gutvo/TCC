import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from './slice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { api } from '@Services/backendApi'
import {
  CityDTO,
  CreatePhoneDTO,
  createAction,
  CreatePhoneActions,
  createUserDTO,
  deleteActions,
  deleteDTO,
  loginAction,
  loginDTO,
  showAction,
  showUserDTO,
  updateAction,
  updateUserDTO,
  DeletePhoneActions,
  UpdatePhoneActions,
} from '@Interfaces/redux/users'
import { readFileAsBase64 } from '@Functions'

function* createUser({ payload }: createAction) {
  const { createUserFailure, createUserSuccess } = actions
  const { email, password, name, ongData } = payload.data
  const { navigation } = payload

  try {
    const user: createUserDTO = yield api.post('/user', {
      email,
      password,
      name,
      ongData,
    })

    yield put(createUserSuccess())

    navigation('/login')

    toast.success(user.data.message)
  } catch (error) {
    yield put(createUserFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* updateUser({ payload }: updateAction) {
  const { updateUserSuccess, updateUserFailure } = actions
  const { setEditable } = payload
  const { data } = payload

  const userDataDTO = { ...data, imageData: data.imageData[0] }
  try {
    const response: updateUserDTO = yield api.put('/user', {
      ...userDataDTO,
    })
    const user = response.data.data
    let userData
    if (user.image) {
      const image: { data: File } = yield api.get(
        `/user/images/${data.email}`,
        {
          responseType: 'blob',
        },
      )
      const imageBase64: string = yield readFileAsBase64(image.data)
      userData = { ...user, previewImage: imageBase64 }
    } else {
      userData = { ...user, previewImage: '' }
    }
    yield put(updateUserSuccess(userData))
    setEditable(false)
    toast.success(response.data.message)
  } catch (error) {
    yield put(updateUserFailure())

    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* showUser({ payload }: showAction) {
  const { showUserSuccess, showUserFailure, logout } = actions
  const { email } = payload

  try {
    const user: showUserDTO = yield api.get('/user', {
      params: {
        email,
      },
    })
    const { data } = user
    let userData
    if (user.data.image) {
      const image: { data: File } = yield api.get(`/user/images/${email}`, {
        responseType: 'blob',
      })
      const imageBase64: string = yield readFileAsBase64(image.data)
      userData = { ...data, previewImage: imageBase64 }
    } else {
      userData = { ...data, previewImage: '' }
    }

    yield put(showUserSuccess(userData))
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response?.status === 404) {
        yield put(logout())
      } else {
        yield put(showUserFailure())
        toast.error(error.response.data.message)
      }
    }
  }
}

function* loginUser({ payload }: loginAction) {
  const { loginFailure, loginSuccess } = actions
  const { navigation } = payload
  const { email, password } = payload.data
  try {
    const user: loginDTO = yield api.post('/user/login', {
      email,
      password,
    })

    localStorage.setItem('token', user.data.token)
    localStorage.setItem(
      'user',
      JSON.stringify({
        email: user.data.data.email,
        password: user.data.data.password,
      }),
    )

    yield put(loginSuccess(user.data))

    navigation('/')
    toast.success(user.data.message)
  } catch (error) {
    yield put(loginFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* deleteUser({ payload }: deleteActions) {
  const { deleteUserFailure, deleteUserSuccess, logout } = actions
  const { email, id, navigation } = payload
  try {
    const user: deleteDTO = yield api.delete('/user', {
      params: {
        email,
        id,
      },
    })
    yield put(deleteUserSuccess())
    yield put(logout())
    navigation('/')
    toast.success(user.data.message)
  } catch (error) {
    yield put(deleteUserFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* getCitys() {
  const { listCitySuccess, listCityFailure } = actions
  try {
    const result: CityDTO = yield api.get('/city')
    yield put(listCitySuccess(result.data))
  } catch (error) {
    yield put(listCityFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}
function* createPhone({ payload }: CreatePhoneActions) {
  const { handlePhoneData, ongId, phone } = payload
  const { createPhoneSuccess, createPhoneFailure } = actions
  try {
    const result: CreatePhoneDTO = yield api.post('/phone', { ongId, phone })
    yield put(createPhoneSuccess(result.data.data))
    toast.success(result.data.message)
    handlePhoneData('')
  } catch (error) {
    yield put(createPhoneFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* deletePhone({ payload }: DeletePhoneActions) {
  const { id, index } = payload
  const { deletePhoneSuccess, deletePhoneFailure } = actions
  try {
    const result: CreatePhoneDTO = yield api.delete('/phone', {
      params: { id },
    })
    yield put(deletePhoneSuccess(index))
    toast.success(result.data.message)
  } catch (error) {
    yield put(deletePhoneFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}
function* updatePhone({ payload }: UpdatePhoneActions) {
  const { phone, index, id, setEditIndex } = payload
  const { updatePhoneSuccess, updatePhoneFailure } = actions
  try {
    const result: CreatePhoneDTO = yield api.put('/phone', { phone, id })
    yield put(updatePhoneSuccess(index, result.data.data))
    toast.success(result.data.message)
    setEditIndex(null)
  } catch (error) {
    yield put(updatePhoneFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

export default all([
  takeLatest(actions.createUserRequest.type, createUser),
  takeLatest(actions.updateUserRequest.type, updateUser),
  takeLatest(actions.loginRequest.type, loginUser),
  takeLatest(actions.showUserRequest.type, showUser),
  takeLatest(actions.deleteUserRequest.type, deleteUser),
  takeLatest(actions.listCityRequest.type, getCitys),
  takeLatest(actions.createPhoneRequest.type, createPhone),
  takeLatest(actions.deletePhoneRequest.type, deletePhone),
  takeLatest(actions.updatePhoneRequest.type, updatePhone),
])
