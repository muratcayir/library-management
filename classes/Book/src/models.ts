/* eslint-disable prettier/prettier */
import { z } from 'zod'

export const createBookRequestSchema = z.object({
  name: z.string().min(1, 'Book name is required'),
})

export type CreateBookRequestSchema = z.infer<typeof createBookRequestSchema>

export const bookResponseSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Book name is required'),
  score: z.number().optional().default(-1),
})

export type BookResponseSchema = z.infer<typeof bookResponseSchema>
