import { actions } from '@Redux/ongs/slice'

export interface userOngData {
  id: number
  road: string
  neighborhood: string
  city: string
  CEP: string
  userData: { name: string; email: string }
}

export interface InitialState {
  loading: boolean
  data: userOngData[] | null
  ongData: userOngData | null
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
  }
}

export interface showActions {
  type: typeof actions.listOngRequest.type
  payload: {
    id: number
  }
}
