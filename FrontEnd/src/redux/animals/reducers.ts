import {
  AnimalData,
  InitialStateProps,
  PaginationProps,
} from '@Interfaces/redux/animals'
import { PayloadAction } from '@reduxjs/toolkit'

export const reducers = {
  // List
  listAnimalRequest: {
    reducer: (state: InitialStateProps) => {
      state.loading = true
    },
    prepare: (offset: number, limit: number, ongId: number | null) => {
      return { payload: { offset, limit, ongId } }
    },
  },

  listAnimalSuccess: {
    reducer: (
      state: InitialStateProps,
      action: PayloadAction<{
        data: AnimalData[]
        pagination: PaginationProps
      }>,
    ) => {
      const { data, pagination } = action.payload
      state.pagination = pagination
      state.list = data
      state.loading = false
    },
    prepare: (data: AnimalData[], pagination: PaginationProps) => {
      return { payload: { data, pagination } }
    },
  },

  listAnimalFailure: (state: InitialStateProps) => {
    state.loading = false
  },

  // Create
  createAnimalRequest: {
    reducer: (state: InitialStateProps) => {
      state.loading = true
    },
    prepare: (data: AnimalData) => {
      return { payload: { data } }
    },
  },
  createAnimalSuccess: (state: InitialStateProps) => {
    state.loading = false
  },
  createtAnimalFailure: (state: InitialStateProps) => {
    state.loading = false
  },

  // Show
  showAnimalRequest: {
    reducer: (state: InitialStateProps) => {
      state.loading = true
    },
    prepare: (id: string, ongId: number | undefined) => {
      return { payload: { id, ongId } }
    },
  },
  showAnimalSuccess: {
    reducer: (
      state: InitialStateProps,
      action: PayloadAction<{ data: AnimalData }>,
    ) => {
      state.animalData = action.payload.data
      state.loading = false
    },
    prepare: (data: AnimalData) => {
      return { payload: { data } }
    },
  },
  showAnimalFailure: (state: InitialStateProps) => {
    state.loading = false
  },
}
