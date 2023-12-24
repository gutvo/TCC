import modules from './modules'
import { type DictionaryProps } from './types'

export default function translate ({ id, language = 'ptBr', value }: DictionaryProps) {
  let message = modules[language][id]

  if (value !== undefined) {
    message = message.replace('{value}', value)
  }
  return message
}
