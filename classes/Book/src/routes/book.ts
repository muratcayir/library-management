/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { create, get, getAll } from '../controller/book'

const router = express.Router()

router.post('/books', create)
router.get('/books/:bookId', get)
router.get('/books', getAll)

export { router as bookRouter }
