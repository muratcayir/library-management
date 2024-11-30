import { z } from 'zod'

export const borrowedBookSchema = z.object({
  id: z.number().optional(),
  userId: z.number(),
  bookId: z.number(),
  score: z.number().min(0).max(10).optional().default(-1),
  borrowedAt: z.date(),
  returnedAt: z.date().optional(),
})

export const borrowBookRequestSchema = z.object({
  userId: z.number(),
  bookId: z.number(),
})

export type BorrowBookRequestSchema = z.infer<typeof borrowBookRequestSchema>

export const borrowedBookResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  bookId: z.number(),
  score: z.number().min(0).max(10).optional().default(-1),
  borrowedAt: z.date(),
  returnedAt: z.date().optional(),
})

export type BorrowedBookResponseSchema = z.infer<typeof borrowedBookResponseSchema>
