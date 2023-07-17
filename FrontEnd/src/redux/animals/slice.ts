import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Animal {
  id: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: number
  image: boolean
  imagesData: File | null
}

interface Pagination {
  offset: number
  limit: number
  count: number
}

interface InitialStateProps {
  loading: boolean
  list: Animal[]
  pagination: Pagination
}

const initialState: InitialStateProps = {
  loading: false,
  list: [],
  pagination: {
    offset: 0,
    limit: 2,
    count: 9,
  },
}

export const sliceAnimal = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    getAnimalRequest: {
      reducer: (state) => {
        state.loading = true
      },
      prepare: (offset, limit) => {
        return { payload: { offset, limit } }
      },
    },

    getAnimalSuccess: {
      reducer: (
        state,
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

    getAnimalFailure: (state) => {
      state.loading = false
    },
  },
})

export const { actions } = sliceAnimal

export default sliceAnimal.reducer
