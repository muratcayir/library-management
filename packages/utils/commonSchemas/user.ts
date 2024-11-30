import { z } from 'zod'
import { borrowedBookSchema } from './borrowed-book'

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  borrowedBooks: z.array(z.lazy(() => borrowedBookSchema)).optional(),
})
