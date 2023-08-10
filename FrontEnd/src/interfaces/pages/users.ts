import { UserData } from '@Interfaces/redux/users'

// -------------------------------------------
// Global Interfaces

export interface ongData {
  road: string
  neighborhood: string
  city: string
  CEP: string
}
export interface ViaCepDTO {
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: String
}

// -------------------------------------------
// show

// Form Profile

export interface ProfileFormData {
  name: string
  email: string
  ongData: ongData | null
}

export interface ProfileFormProps {
  data: UserData
  handleUpdateUser: (data: ProfileFormData) => void
  editable: boolean
  setEditable: (data: boolean) => void
}

// Delete Dialog

export interface DeleteDialogProps {
  dialogIsVisible: boolean
  setDialogIsVisible: (choice: boolean) => void
}

// -------------------------------------------
// Login

export interface loginFormData {
  email: string
  password: string
}

// -------------------------------------------
// Create

export interface NewUserFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  ongData: ongData | null
}

export interface UserFormProps {
  handleAddUser: (data: NewUserFormData) => void
  isOng: boolean
}

// -------------------------------------------
