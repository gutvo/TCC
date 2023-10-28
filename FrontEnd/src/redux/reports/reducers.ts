import { InitialState, fetchAnimalReportDTO } from '@Interfaces/redux/reports'

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
}
