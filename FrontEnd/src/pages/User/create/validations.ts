import * as zod from 'zod'

export const newUserFormSchema = zod
  .object({
    name: zod.string().min(3, 'Digite um nome válido.'),
    email: zod.string().email('Precisa ser um email válido.'),
    password: zod.string().min(8, 'Tem que ter no minímo 8 caracteres.'),
    confirmPassword: zod.string().min(8, 'Tem que ter no minímo 8 caracteres.'),
    ongData: zod
      .object({
        road: zod.string().min(4, 'Tem que ter no minímo 4 caracteres'),
        neighborhood: zod.string().min(4, 'Tem que ter no minímo 4 caracteres'),
        city: zod.string().min(4, 'Tem que ter no minímo 4 caracteres'),
        CEP: zod
          .string({ invalid_type_error: 'CEP inválido' })
          .min(8, 'CEP inválido')
          .max(9, 'CEP inválido'),
      })
      .nullable(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: 'As senhas não batem',
    path: ['confirmPassword'],
  })

export type CreateUser = zod.infer<typeof newUserFormSchema>
