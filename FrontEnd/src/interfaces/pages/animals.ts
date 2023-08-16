import { AnimalData } from '@Interfaces/redux/animals'

// List
export interface CardAnimalProps {
  data: AnimalData[]
}

// -------------------------------------------
// Create

export interface newAnimalFormData {
  ongId: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: Date
  image: boolean
  imageData: FileList
}

// -------------------------------------------
// Update

export interface UpdateAnimalFormData {
  id: number
  name: string
  race: string
  color: string
  sex: 'Macho' | 'Fêmea'
  description: string
  type: 'Cachorro' | 'Peixe' | 'Gato' | 'Outros'
  birthday: Date
  image: boolean
  imageData: FileList
}

// -------------------------------------------

// Delete Dialog

export interface DeleteAnimalDialogProps {
  dialogIsVisible: boolean
  setDialogIsVisible: () => void
  name: string
  id: number
}
