import { z } from 'zod'
import { borrowedBookSchema } from './borrowed-book'

export const bookSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Book name is required'),
  score: z.number().min(0).max(10).optional().default(-1),
  borrowedBooks: z.array(z.lazy(() => borrowedBookSchema)).optional(),
})
