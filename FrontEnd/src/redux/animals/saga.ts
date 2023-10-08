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
  AnimalData,
} from '@Interfaces/redux/animals'
import { toast } from 'react-toastify'
import axios from 'axios'

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

    const list: AnimalData[] = yield all(
      result.data.map(async (animal) => {
        if (animal.image) {
          const image: string = await api
            .get(`/animal/images/${animal.id}`, {
              responseType: 'blob',
            })
            .then((response) => {
              return URL.createObjectURL(response.data)
            })
          return { ...animal, previewImage: image }
        } else {
          return { ...animal, previewImage: '' }
        }
      }),
    )

    yield put(listAnimalSuccess(list, result.pagination))
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

    let animalData
    if (data.image) {
      const image: string = yield api
        .get(`/animal/images/${data.id}`, {
          responseType: 'blob',
        })
        .then((response) => {
          return URL.createObjectURL(response.data)
        })
      animalData = { ...data, previewImage: image }
    } else {
      animalData = { ...data, previewImage: undefined }
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

export default all([
  takeLatest(actions.listAnimalRequest.type, listAnimals),
  takeLatest(actions.createAnimalRequest.type, createAnimal),
  takeLatest(actions.showAnimalRequest.type, showAnimal),
  takeLatest(actions.updateAnimalRequest.type, updateAnimal),
  takeLatest(actions.deleteAnimalRequest.type, deleteAnimal),
])
