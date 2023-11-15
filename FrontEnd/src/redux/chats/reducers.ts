import { InitialState, messageProps, roomsProps } from '@Interfaces/redux/chats'
import { PayloadAction } from '@reduxjs/toolkit'

export const reducers = {
  setNotifications: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ notifications: number[] }>,
    ) => {
      state.notifications = action.payload.notifications
    },
    prepare: (notifications: number[]) => {
      return { payload: { notifications } }
    },
  },
  setMessages: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ messages: messageProps[] }>,
    ) => {
      state.messages = action.payload.messages
    },
    prepare: (messages: messageProps[]) => {
      return { payload: { messages } }
    },
  },
  setSelectedUser: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ selectedUser: roomsProps | null }>,
    ) => {
      state.selectedUser = action.payload.selectedUser
    },
    prepare: (selectedUser: roomsProps | null) => {
      return { payload: { selectedUser } }
    },
  },
  setUsers: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ users: roomsProps[] }>,
    ) => {
      state.users = action.payload.users
    },
    prepare: (users: roomsProps[]) => {
      return { payload: { users } }
    },
  },
}
