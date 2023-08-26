import { InitialState, listOngDTO } from '@Interfaces/redux/ongs'
import { PayloadAction } from '@reduxjs/toolkit'

export const reducers = {
  listOngRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (offset: number, limit: number) => {
      return { payload: { offset, limit } }
    },
  },
  listOngSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: listOngDTO }>,
    ) => {
      state.data = action.payload.data.data.data.rows
      state.loading = false
    },
    prepare: (data: listOngDTO) => {
      return { payload: { data } }
    },
  },

  listOngFailure: (state: InitialState) => {
    state.loading = false
  },
}