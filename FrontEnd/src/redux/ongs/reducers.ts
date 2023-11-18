import { InitialState, listOngDTO, OngFilter } from '@Interfaces/redux/ongs'
import { userOngData } from '@Interfaces/redux/users'
import { PayloadAction } from '@reduxjs/toolkit'

export const reducers = {
  listOngRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (
      offset: number,
      limit: number,
      city: string,
      filter: OngFilter,
    ) => {
      return { payload: { offset, limit, filter, city } }
    },
  },
  listOngSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ data: listOngDTO; filter: OngFilter }>,
    ) => {
      const { data, pagination } = action.payload.data.data
      state.data = data
      state.pagination = pagination
      state.filter = action.payload.filter
      state.loading = false
    },
    prepare: (data: listOngDTO, filter: OngFilter) => {
      return { payload: { data, filter } }
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
  listRoadNeighborhoodRequest: {
    reducer: (state: InitialState) => {
      state.loading = true
    },
    prepare: (city: string) => {
      return { payload: { city } }
    },
  },
  listRoadNeighborhoodSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{
        road: string[]
        neighborhood: string[]
        name: string[]
      }>,
    ) => {
      const { neighborhood, road, name } = action.payload
      state.names = name
      state.roads = road
      state.neighborhoods = neighborhood
      state.loading = false
    },
    prepare: (road: string[], neighborhood: string[], name: string[]) => {
      return { payload: { road, neighborhood, name } }
    },
  },
  listRoadNeighborhoodFailure: (state: InitialState) => {
    state.loading = false
  },
  resetFilter: (state: InitialState) => {
    state.filter = {
      name: '',
      neighborhood: '',
      road: '',
    }
  },
}
