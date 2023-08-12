import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from './slice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { api } from '@Services/backendApi'
import {
  createAction,
  createUserDTO,
  deleteActions,
  deleteDTO,
  listOngActions,
  listOngDTO,
  loginAction,
  loginDTO,
  showAction,
  showUserDTO,
  updateAction,
  updateUserDTO,
} from '@Interfaces/redux/users'

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
  const { email, name, ongData } = payload.data

  try {
    const user: updateUserDTO = yield api.put('/user', {
      email,
      name,
      ongData,
    })
    yield put(updateUserSuccess(user.data.data))
    setEditable(false)
    toast.success(user.data.message)
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
    yield put(showUserSuccess(user.data))
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

    yield localStorage.setItem('token', user.data.token)
    yield localStorage.setItem(
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
    console.log(error)
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
function* listOng({ payload }: listOngActions) {
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

export default all([
  takeLatest(actions.createUserRequest.type, createUser),
  takeLatest(actions.updateUserRequest.type, updateUser),
  takeLatest(actions.loginRequest.type, loginUser),
  takeLatest(actions.showUserRequest.type, showUser),
  takeLatest(actions.deleteUserRequest.type, deleteUser),
  takeLatest(actions.listOngRequest.type, listOng),
])
