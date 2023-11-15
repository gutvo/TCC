export interface messageProps {
  id: number
  name: string
  email: string
  message: string
}

export interface roomsProps {
  id: number
  name: string
  ongData?: { email: string; name: string; image: string }
  userData?: { email: string; name: string; image: string }
  receiver: number
  sender: number
}

export interface InitialState {
  notifications: number[]
  messages: messageProps[]
  selectedUser: roomsProps | null
  users: roomsProps[]
}
