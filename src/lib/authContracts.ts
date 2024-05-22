import { z } from 'zod'

export const signUpRequest = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Must be between 1 and 32 characters' })
    .max(32, { message: 'Must be between 1 and 32 characters' })
    .readonly(),
  lastName: z.string().readonly(),
  email: z.string().email().readonly(),
  password: z.string().readonly(),
  redirectTo: z.string().url().readonly()
})

export type SignUpRequest = z.infer<typeof signUpRequest>

export const loginRequest = signUpRequest.omit({
  firstName: true,
  lastName: true
})

export type LoginRequest = z.infer<typeof loginRequest>

export const resetPasswordRequest = loginRequest.omit({ password: true })

export type ResetPasswordRequest = z.infer<typeof resetPasswordRequest>
