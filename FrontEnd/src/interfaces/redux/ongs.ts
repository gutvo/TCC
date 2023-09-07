import { actions } from '@Redux/ongs/slice'

export interface userOngData {
  id: number
  road: string
  neighborhood: string
  city: string
  CEP: string
  userData: { name: string; email: string }
}

export interface OngFilter {
  name: string
  city: string
}
interface OngPagination {
  offset: number
  limit: number
}

export interface InitialState {
  loading: boolean
  data: userOngData[] | null
  ongData: userOngData | null
  pagination: OngPagination
}

export interface listOngDTO {
  data: {
    data: {
      rows: userOngData[]
      count: number
    }
  }
}

// -------------------------------------------
// actions

export interface listActions {
  type: typeof actions.listOngRequest.type
  payload: {
    offset: number
    limit: number
    filter: OngFilter
    city: string
  }
}

export interface showActions {
  type: typeof actions.listOngRequest.type
  payload: {
    id: number
  }
}
