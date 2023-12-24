import type ptBr from './modules/ptBr'

export interface DictionaryProps {
  id: keyof typeof ptBr
  value?: string
  language?: 'ptBr'
}

export type Modules = Record<string, Record<string, string>>
