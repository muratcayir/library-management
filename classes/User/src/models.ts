import { z } from 'zod'

export const createUserRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

export type CreateUserRequestSchema = z.infer<typeof createUserRequestSchema>

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
})

export type UserResponseSchema = z.infer<typeof userResponseSchema>

export const userWithBooksSchema = z.object({
  id: z.number(),
  name: z.string(),
  books: z.object({
    past: z.array(
      z.object({
        name: z.string(),
        userScore: z.number().int().optional(),
      }),
    ),
    present: z.array(
      z.object({
        name: z.string(),
      }),
    ),
  }),
})

export type UserWithBooksSchema = z.infer<typeof userWithBooksSchema>
