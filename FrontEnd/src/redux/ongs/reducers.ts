import { InitialState, listOngDTO } from '@Interfaces/redux/ongs'
import { userOngData } from '@Interfaces/redux/users'
import { PayloadAction } from '@reduxjs/toolkit'

export const reducers = {
  listOngRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (offset: number, limit: number, city: string) => {
      return { payload: { offset, limit, city } }
    },
  },
  listOngSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: listOngDTO }>,
    ) => {
      const { data } = action.payload.data.data
      state.data = data.rows
      state.loading = false
    },
    prepare: (data: listOngDTO) => {
      return { payload: { data } }
    },
  },

  listOngFailure: (state: InitialState) => {
    state.loading = false
  },

  showOngRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (id: number) => {
      return { payload: { id } }
    },
  },
  showOngSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: userOngData }>,
    ) => {
      state.ongData = action.payload.data
      state.loading = false
    },
    prepare: (data: userOngData) => {
      return { payload: { data } }
    },
  },
  showOngFailure: (state: InitialState) => {
    state.loading = false
  },
}
