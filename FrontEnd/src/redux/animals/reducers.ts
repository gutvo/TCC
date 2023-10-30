import { newAnimalFormData } from '@Interfaces/pages/animals'
import {
  AnimalData,
  InitialState,
  PaginationProps,
} from '@Interfaces/redux/animals'
import { PayloadAction } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'
import { UseFormReset } from 'react-hook-form'

export const reducers = {
  // List
  listAnimalRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (
      offset: number,
      limit: number,
      ongId: number | null,
      city: string,
    ) => {
      return { payload: { offset, limit, ongId, city } }
    },
  },

  listAnimalSuccess: {
    reducer: (
      state: InitialState,
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

  listAnimalFailure: (state: InitialState) => {
    state.loading = false
  },

  // Create
  createAnimalRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (
      data: newAnimalFormData,
      reset: UseFormReset<newAnimalFormData>,
    ) => {
      return { payload: { data, reset } }
    },
  },
  createAnimalSuccess: (state: InitialState) => {
    state.loading = false
  },
  createtAnimalFailure: (state: InitialState) => {
    state.loading = false
  },

  // Show
  showAnimalRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (id: string, ongId: number | undefined) => {
      return { payload: { id, ongId } }
    },
  },
  showAnimalSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: AnimalData }>,
    ) => {
      state.animalData = action.payload.data
      state.loading = false
    },
    prepare: (data: AnimalData) => {
      return { payload: { data } }
    },
  },
  showAnimalFailure: (state: InitialState) => {
    state.loading = false
  },

  // Update
  updateAnimalRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (data: AnimalData) => {
      return { payload: { data } }
    },
  },
  updateAnimalSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: AnimalData }>,
    ) => {
      state.animalData = action.payload.data
      state.loading = false
    },
    prepare: (data: AnimalData) => {
      return { payload: { data } }
    },
  },
  updateAnimalFailure: (state: InitialState) => {
    state.loading = false
  },
  // Delete
  deleteAnimalRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (id: number, navigation: NavigateFunction) => {
      return { payload: { id, navigation } }
    },
  },
  deleteAnimalSuccess: (state: InitialState) => {
    state.animalData = null
    state.loading = false
  },
  deleteAnimalFailure: (state: InitialState) => {
    state.loading = false
  },

  listRandomAnimalRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (city: string) => {
      return { payload: { city } }
    },
  },

  listRandomAnimalSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: AnimalData[] }>,
    ) => {
      state.loading = true
      state.list = action.payload.data
    },
    prepare: (data: AnimalData[]) => {
      return { payload: { data } }
    },
  },
  listRandomAnimalFailure: (state: InitialState) => {
    state.loading = false
  },
}
