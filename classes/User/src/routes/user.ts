/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { borrowBook, create, get, getAll, returnBook } from '../controller/user'

const router = express.Router()

router.post('/users', create)
router.get('/users/:userId', get)
router.get('/users', getAll)
router.post('/users/:userId/borrow/:bookId', borrowBook)
router.post('/users/:userId/return/:bookId', returnBook)

export { router as userRouter }
