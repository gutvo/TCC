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
  listAdoptedAnimalsActions,
  listAdoptedAnimalsDTO,
  showAdoptedAnimalDTO,
  showAdoptedAnimalAction,
  AdoptedAnimalData,
} from '@Interfaces/redux/adoptions'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AnimalData } from '@Interfaces/redux/animals'

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

function* listAdoptedAnimals({ payload }: listAdoptedAnimalsActions) {
  const { listAdoptedAnimalsFailure, listAdoptedAnimalsSuccess } = actions
  const { ongId, limit, offset, filter } = payload
  try {
    const response: listAdoptedAnimalsDTO = yield api.get('/adopted/animal', {
      params: {
        ongId,
        limit,
        offset,
        filter,
      },
    })

    const { data, pagination } = response.data

    yield put(listAdoptedAnimalsSuccess(data, pagination, filter))
  } catch (error) {
    yield put(listAdoptedAnimalsFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

function* showAdoptedAnimal({ payload }: showAdoptedAnimalAction) {
  const { showAdoptedAnimalFailure, showAdoptedAnimalSuccess } = actions
  try {
    const animal: showAdoptedAnimalDTO = yield api.get(
      `/adopted/animal/${payload.id}`,
    )
    const { data } = animal

    let animalData

    if (data.animalData.image) {
      const image: string = yield api
        .get(`/animal/images/${data.animalData.id}`, {
          responseType: 'blob',
        })
        .then((response) => {
          return URL.createObjectURL(response.data)
        })

      const updatedAnimalData: AnimalData = {
        ...data.animalData,
        previewImage: image,
      }

      const adoptedAnimalData: AdoptedAnimalData = {
        id: data.animalData.id,
        animalData: updatedAnimalData,
        userName: data.userName,
        userEmail: data.userEmail,
      }

      yield put(showAdoptedAnimalSuccess(adoptedAnimalData))
    } else {
      animalData = { ...data.animalData, previewImage: undefined }
      const adoptedAnimalData: AdoptedAnimalData = {
        id: data.animalData.id,
        animalData,
        userName: data.userName,
        userEmail: data.userEmail,
      }

      yield put(showAdoptedAnimalSuccess(adoptedAnimalData))
    }
  } catch (error) {
    console.log(console.log(error))

    yield put(showAdoptedAnimalFailure())
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
  takeLatest(actions.listAdoptedAnimalsRequest.type, listAdoptedAnimals),
  takeLatest(actions.showAdoptedAnimalRequest.type, showAdoptedAnimal),
])
