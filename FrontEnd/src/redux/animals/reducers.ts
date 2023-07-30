import { PayloadAction } from '@reduxjs/toolkit'

export interface Pagination {
  offset: number
  limit: number
  count: number
}

export interface Animal {
  id?: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: Date
  image: boolean | string
  imagesData: FileList
}

export interface InitialStateProps {
  loading: boolean
  list: Animal[]
  animalData: Animal | null
  pagination: Pagination
}

export const reducers = {
  // List
  listAnimalRequest: {
    reducer: (state: InitialStateProps) => {
      state.loading = true
    },
    prepare: (offset: number, limit: number) => {
      return { payload: { offset, limit } }
    },
  },

  listAnimalSuccess: {
    reducer: (
      state: InitialStateProps,
      action: PayloadAction<{ data: Animal[]; pagination: Pagination }>,
    ) => {
      const { data, pagination } = action.payload
      state.pagination = pagination
      state.list = data
      state.loading = false
    },
    prepare: (data: Animal[], pagination: Pagination) => {
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
    prepare: (data: Animal) => {
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
    prepare: (id: number) => {
      return { payload: { id } }
    },
  },
  showAnimalSuccess: {
    reducer: (
      state: InitialStateProps,
      action: PayloadAction<{ data: Animal }>,
    ) => {
      state.animalData = action.payload.data
      state.loading = false
    },
    prepare: (data: Animal) => {
      return { payload: { data } }
    },
  },
  showAnimalFailure: (state: InitialStateProps) => {
    state.loading = false
  },
}
