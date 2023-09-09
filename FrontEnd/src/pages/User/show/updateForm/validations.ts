import * as zod from 'zod'

export const updateUserFormSchema = zod.object({
  name: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
  email: zod.string().email('Precisa ser um email válido'),
  ongData: zod
    .object({
      road: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
      neighborhood: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
      city: zod.string().min(4, 'tem que ter no minímo 4 caracteres'),
      uf: zod.string().length(2, 'Só pode ter dois digitos'),
      CEP: zod
        .string({ invalid_type_error: 'CEP inválido' })
        .min(8, 'CEP inválido')
        .max(9, 'CEP inválido'),
    })
    .nullable(),
})

export type UserUpdate = zod.infer<typeof updateUserFormSchema>
