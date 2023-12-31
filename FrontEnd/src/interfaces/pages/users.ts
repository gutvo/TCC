import { UserData } from '@Interfaces/redux/users'

// -------------------------------------------
// Global Interfaces

export interface ongData {
  road: string
  neighborhood: string
  city: string
  CEP: string
  cpfCnpj: string
}
export interface ViaCepDTO {
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
}

// -------------------------------------------
// show

// Form Profile

export interface ProfileFormData {
  name: string
  email: string
  primaryPhone?: string
  secondaryPhone?: string
  ongData: ongData | null
  imageData: FileList
}

export interface ProfileFormProps {
  data: UserData
}

// Delete Dialog

export interface DeleteUserDialogProps {
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

export interface CreateFormProps {
  handleAddUser: (data: NewUserFormData) => void
}
// -------------------------------------------
