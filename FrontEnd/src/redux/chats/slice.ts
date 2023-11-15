import { createSlice } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { InitialState } from '@Interfaces/redux/chats'

const initialState: InitialState = {
  notifications: [],
  messages: [],
  selectedUser: null,
  users: [],
}

const sliceChat = createSlice({
  name: 'chats',
  initialState,
  reducers,
})

export const { actions } = sliceChat

export default sliceChat.reducer
