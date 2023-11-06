import {
  AdoptedAnimalData,
  AdoptionData,
  InitialState,
  PaginationProps,
  animalFilterProps,
} from '@Interfaces/redux/adoptions'
import { PayloadAction } from '@reduxjs/toolkit'

export const reducers = {
  createAdoptionRequests: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (userId: number, animalId: number, ongId: number) => {
      return { payload: { userId, animalId, ongId } }
    },
  },
  createAdoptionSuccess: (state: InitialState) => {
    state.loading = false
  },
  createAdoptionFailure: (state: InitialState) => {
    state.loading = false
  },
  listAdoptionRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (ongId: number, offset: number, limit: number) => {
      return { payload: { ongId, offset, limit } }
    },
  },
  listAdoptionSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{
        data: AdoptionData[]
        pagination: PaginationProps
      }>,
    ) => {
      state.adoptionData = action.payload.data
      state.pagination = action.payload.pagination
      state.loading = false
    },
    prepare: (data: AdoptionData[], pagination: PaginationProps) => {
      return { payload: { data, pagination } }
    },
  },
  listAdoptionFailure: (state: InitialState) => {
    state.loading = false
  },
  adoptAnimalRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (adoptionId: number, fetchAdoptedRequests: () => void) => {
      return { payload: { adoptionId, fetchAdoptedRequests } }
    },
  },
  adoptAnimalSuccess: (state: InitialState) => {
    state.loading = false
  },
  adoptAnimalFailure: (state: InitialState) => {
    state.loading = false
  },

  deleteAdoptionRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (adoptionId: number, fetchAdoptedRequests: () => void) => {
      return { payload: { adoptionId, fetchAdoptedRequests } }
    },
  },

  deleteAdoptionSuccess: (state: InitialState) => {
    state.loading = false
  },
  deleteAdoptionFailure: (state: InitialState) => {
    state.loading = false
  },

  listAdoptedAnimalsRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (
      ongId: number,
      offset: number,
      limit: number,
      filter: animalFilterProps,
    ) => {
      return { payload: { ongId, offset, limit, filter } }
    },
  },

  listAdoptedAnimalsSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{
        data: AdoptedAnimalData[]
        pagination: PaginationProps
        filter: animalFilterProps
      }>,
    ) => {
      const { data, pagination, filter } = action.payload
      state.pagination = pagination
      state.adoptedAnimalList = data
      state.filter = filter
      state.loading = false
    },
    prepare: (
      data: AdoptedAnimalData[],
      pagination: PaginationProps,
      filter: animalFilterProps,
    ) => {
      return { payload: { data, pagination, filter } }
    },
  },

  listAdoptedAnimalsFailure: (state: InitialState) => {
    state.loading = false
  },

  showAdoptedAnimalRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (id: string) => {
      return { payload: { id } }
    },
  },
  showAdoptedAnimalSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: AdoptedAnimalData }>,
    ) => {
      state.animalData = action.payload.data
      state.loading = false
    },
    prepare: (data: AdoptedAnimalData) => {
      return { payload: { data } }
    },
  },
  showAdoptedAnimalFailure: (state: InitialState) => {
    state.loading = false
  },
}
