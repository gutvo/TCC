import { newAnimalFormData } from '@Interfaces/pages/animals'
import {
  AnimalData,
  InitialStateProps,
  PaginationProps,
} from '@Interfaces/redux/animals'
import { PayloadAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'

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
    prepare: (data: newAnimalFormData, navigation: NavigateFunction) => {
      return { payload: { data, navigation } }
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

  // Update
  updateAnimalRequest: {
    reducer: (state: InitialStateProps) => {
      state.loading = true
    },
    prepare: (data: AnimalData) => {
      return { payload: { data } }
    },
  },
  updateAnimalSuccess: {
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
  updateAnimalFailure: (state: InitialStateProps) => {
    state.loading = false
  },
  // Delete
  deleteAnimalRequest: {
    reducer: (state: InitialStateProps) => {
      state.loading = true
    },
    prepare: (id: number, navigation: NavigateFunction) => {
      return { payload: { id, navigation } }
    },
  },
  deleteAnimalSuccess: (state: InitialStateProps) => {
    state.animalData = null
    state.loading = false
  },
  deleteAnimalFailure: (state: InitialStateProps) => {
    state.loading = false
  },
}
