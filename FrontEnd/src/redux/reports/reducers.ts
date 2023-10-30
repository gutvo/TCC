import {
  InitialState,
  fetchAnimalReportDTO,
  fetchDashboardDTO,
} from '@Interfaces/redux/reports'

import { PayloadAction } from '@reduxjs/toolkit'

export const reducers = {
  getRescuedAdoptedAnimalRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (ongId: number, year: number) => {
      return { payload: { year, ongId } }
    },
  },
  getRescuedAdoptedAnimalSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: fetchAnimalReportDTO }>,
    ) => {
      state.animalData = action.payload.data.data.data
      state.loading = false
    },
    prepare: (data: fetchAnimalReportDTO) => {
      return { payload: { data } }
    },
  },
  getRescuedAdoptedAnimalFailure: (state: InitialState) => {
    state.loading = false
  },
  getDashboardDataRequest: (state: InitialState) => {
    state.loading = true
  },
  getDashboardDataSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: fetchDashboardDTO }>,
    ) => {
      state.dashboadHomeData = action.payload.data.data
      state.loading = false
    },
    prepare: (data: fetchDashboardDTO) => {
      return { payload: { data } }
    },
  },
  getDashboardDataFailure: (state: InitialState) => {
    state.loading = false
  },
}
