import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from './slice'
import axios from 'axios'
import { toast } from 'react-toastify'
import { api } from '@Services/backendApi'
import {
  FetchAnimalReportAction,
  fetchAnimalReportDTO,
} from '@Interfaces/redux/reports'

function* getRescuedAdoptedAnimal({ payload }: FetchAnimalReportAction) {
  const { getRescuedAdoptedAnimalSuccess, getRescuedAdoptedAnimalFailure } =
    actions
  const { ongId, year } = payload
  try {
    const result: fetchAnimalReportDTO = yield api.get(
      '/rescuedAdoptedAnimal',
      {
        params: { ongId, year },
      },
    )
    yield put(getRescuedAdoptedAnimalSuccess(result))
  } catch (error) {
    yield put(getRescuedAdoptedAnimalFailure())
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message)
    }
  }
}

export default all([
  takeLatest(
    actions.getRescuedAdoptedAnimalRequest.type,
    getRescuedAdoptedAnimal,
  ),
])
