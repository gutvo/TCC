import * as zod from 'zod'

export const newAnimalFormSchema = zod.object({
  ongId: zod.number(),
  name: zod.string().min(2, 'O nome é obrigatório'),
  race: zod.string().min(2, 'A raça é obrigatório'),
  color: zod.string().min(2, 'A color é obrigatório'),
  sex: zod.union([zod.literal('Macho'), zod.literal('Fêmea')]),
  description: zod.string().max(255, 'Não passe do Limite de 255 caracteres'),
  type: zod.union([
    zod.literal('Cachorro'),
    zod.literal('Peixe'),
    zod.literal('Gato'),
    zod.literal('Outros'),
  ]),
  birthday: zod.date(),
  imagesData: zod.instanceof(FileList),
  image: zod.boolean(),
})

export type CreateAnimal = zod.infer<typeof newAnimalFormSchema>
