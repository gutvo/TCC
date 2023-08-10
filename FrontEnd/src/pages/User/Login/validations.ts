import * as zod from 'zod'

export const loginFormDataSchema = zod.object({
  email: zod.string().email('Precisa ser um email válido'),
  password: zod.string(),
})

export type LoginUser = zod.infer<typeof loginFormDataSchema>
