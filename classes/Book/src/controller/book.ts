/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-floating-promises */
import Errors, { CustomError } from 'utils/custom-error'
import { Request, Response } from 'express'
import { Book, BorrowedBook } from 'utils/models'
import { handleTransactionError } from 'utils/common'
import { Op } from 'sequelize'
import { sequelize } from 'config/database'
import { createBookRequestSchema, bookResponseSchema } from '../models'

/**
 * API endpoint to create a new book.
 */
export const create = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction()
  try {
    const bookValidation = createBookRequestSchema.safeParse(req.body)

    if (!bookValidation.success) {
      throw new CustomError({ error: Errors.Book[2001], localization: 'tr_TR' })
    }

    const { name } = bookValidation.data

    const newBook = await Book.create({ name }, { transaction })

    const validatedResponse = bookResponseSchema.parse(newBook.toJSON())
    await transaction.commit()
    res.status(201).json(validatedResponse)
  } catch (error: any) {
    await transaction.rollback()
    handleTransactionError(error, res)
  }
}

/**
 * API endpoint to get a specific book by ID.
 */
export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = Number(req.params.bookId)
    if (Number.isNaN(bookId)) {
      throw new CustomError({ error: Errors.Book[2002], localization: 'tr_TR' })
    }

    const book = await Book.findByPk(bookId)
    if (!book) {
      throw new CustomError({ error: Errors.Book[2003], localization: 'tr_TR' })
    }

    const borrowedBooks = await BorrowedBook.findAll({
      where: { bookId: book.id, userScore: { [Op.not]: null } },
    })

    let score = -1
    if (borrowedBooks.length > 0) {
      const totalScore = borrowedBooks.reduce((sum, borrowedBook) => sum + (borrowedBook.userScore || 0), 0)
      score = Number.parseFloat((totalScore / borrowedBooks.length).toFixed(2))
    }

    const bookResponse = {
      id: book.id,
      name: book.name,
      score,
    }

    const validatedResponse = bookResponseSchema.parse(bookResponse)

    res.status(200).json(validatedResponse)
  } catch (error: any) {
    handleTransactionError(error, res)
  }
}

/**
 * API endpoint to get all books.
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.findAll({ include: [BorrowedBook] })

    const validatedResponse = books.map(book => bookResponseSchema.parse(book.toJSON()))

    res.status(200).json(validatedResponse)
  } catch (error: any) {
    handleTransactionError(error, res)
  }
}
