import { newAnimalFormData } from '@Interfaces/pages/animals'
import {
  AnimalData,
  InitialState,
  PaginationProps,
  animalFilterProps,
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
      filter: animalFilterProps,
    ) => {
      return { payload: { offset, limit, ongId, filter, city } }
    },
  },

  listAnimalSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{
        data: AnimalData[]
        pagination: PaginationProps
        filter: animalFilterProps
      }>,
    ) => {
      const { data, pagination, filter } = action.payload

      state.pagination = pagination
      state.list = data
      state.filter = filter
      state.loading = false
    },
    prepare: (
      data: AnimalData[],
      pagination: PaginationProps,
      filter: animalFilterProps,
    ) => {
      return { payload: { data, pagination, filter } }
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
    prepare: (id: string) => {
      return { payload: { id } }
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
    prepare: (city: string, ongId: number | undefined) => {
      return { payload: { city, ongId } }
    },
  },

  listRandomAnimalSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: AnimalData[] }>,
    ) => {
      state.list = action.payload.data
      state.loading = false
    },
    prepare: (data: AnimalData[]) => {
      return { payload: { data } }
    },
  },
  listRandomAnimalFailure: (state: InitialState) => {
    state.loading = false
  },
}
