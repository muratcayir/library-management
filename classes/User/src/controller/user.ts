/* eslint-disable prettier/prettier */
import Errors, { CustomError } from 'utils/custom-error'
import { Request, Response } from 'express'
import { Book, User, BorrowedBook } from 'utils/models'
import { handleTransactionError } from 'utils/common'
import { sequelize } from 'config/database'
import { createUserRequestSchema, userWithBooksSchema, userResponseSchema } from '../models'
/**
 * API endpoint to create a new user.
 */
export const create = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction()
  try {
    const userValidation = createUserRequestSchema.safeParse(req.body)

    if (!userValidation.success) {
      throw new CustomError({ error: Errors.User[3001], localization: 'tr_TR' })
    }

    const { name } = userValidation.data

    const newUser = await User.create({ name }, { transaction })

    const validatedResponse = userResponseSchema.parse(newUser.toJSON())

    await transaction.commit()

    res.status(201).json(validatedResponse)
  } catch (error: any) {
    await transaction.rollback()

    await handleTransactionError(error, res)
  }
}

/**
 * API endpoint to get a specific user by ID.
 */

export const get = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.userId)
    if (Number.isNaN(userId)) {
      throw new CustomError({ error: Errors.User[3003], localization: 'tr_TR' })
    }

    const user = await User.findByPk(userId, {
      include: [
        {
          model: BorrowedBook,
          attributes: ['id', 'borrowedAt', 'returnedAt', 'userScore'],
          include: [
            {
              model: Book,
              attributes: ['name'],
            },
          ],
        },
      ],
    })

    if (!user) {
      throw new CustomError({ error: Errors.User[3002], localization: 'tr_TR' })
    }

    const pastBooks = []
    const presentBooks = []

    for (const borrowedBook of user.books) {
      const bookName = borrowedBook.book.name
      if (borrowedBook.returnedAt) {
        pastBooks.push({
          name: bookName,
          userScore: borrowedBook.userScore,
        })
      } else {
        presentBooks.push({
          name: bookName,
        })
      }
    }

    const responseData = {
      id: user.id,
      name: user.name,
      books: {
        past: pastBooks,
        present: presentBooks,
      },
    }

    const validatedResponse = userWithBooksSchema.parse(responseData)

    res.status(200).json(validatedResponse)
  } catch (error: any) {
    await handleTransactionError(error, res)
  }
}

/**
 * API endpoint to get all users.
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll()

    const validatedResponse = users.map(user => userResponseSchema.parse(user.toJSON()))

    res.status(200).json(validatedResponse)
  } catch (error: any) {
    await handleTransactionError(error, res)
  }
}

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction()
  try {
    const userId = Number(req.params.userId)
    const bookId = Number(req.params.bookId)

    if (Number.isNaN(userId)) {
      throw new CustomError({ error: Errors.User[3003], localization: 'tr_TR' })
    }

    if (Number.isNaN(bookId)) {
      throw new CustomError({ error: Errors.Book[2002], localization: 'tr_TR' })
    }

    const book = await Book.findByPk(bookId, { transaction, lock: transaction.LOCK.UPDATE })

    if (!book) {
      throw new CustomError({ error: Errors.Book[2003], localization: 'tr_TR' })
    }

    const user = await User.findByPk(userId, { transaction, lock: transaction.LOCK.UPDATE })

    if (!user) {
      throw new CustomError({ error: Errors.User[3002], localization: 'tr_TR' })
    }

    const borrowedBook = await BorrowedBook.findOne({
      where: { bookId: book.id },
      transaction,
      lock: transaction.LOCK.UPDATE,
    })

    if (borrowedBook && borrowedBook.returnedAt == null) {
      throw new CustomError({ error: Errors.Book[2005], localization: 'tr_TR' })
    }

    await BorrowedBook.create(
      {
        userId: user.id,
        bookId: book.id,
        borrowedAt: new Date(),
      },
      { transaction },
    )
    await transaction.commit()
    res.status(200).json({ message: 'Book borrowed successfully' })
  } catch (error) {
    await transaction.rollback()
    res.status(500).json({ message: 'An error occurred', error })
  }
}

export const returnBook = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction()
  try {
    const { score } = req.body

    const userId = Number(req.params.userId)
    const bookId = Number(req.params.bookId)

    if (Number.isNaN(userId)) {
      throw new CustomError({ error: Errors.User[3003], localization: 'tr_TR' })
    }

    if (Number.isNaN(bookId)) {
      throw new CustomError({ error: Errors.Book[2002], localization: 'tr_TR' })
    }

    const borrowedBook = await BorrowedBook.findOne({
      where: {
        userId,
        bookId,
        returnedAt: null,
      },
      include: [
        {
          model: Book,
          attributes: ['name'],
        },
      ],
      transaction,
      lock: transaction.LOCK.UPDATE,
    })

    if (!borrowedBook) {
      throw new CustomError({ error: Errors.Book[2004], localization: 'tr_TR' })
    }

    borrowedBook.returnedAt = new Date()
    borrowedBook.userScore = score
    await borrowedBook.save({ transaction })

    await transaction.commit()

    res.status(200).json({ message: 'The book was successfully returned.' })
  } catch (error: any) {
    await transaction.rollback()
    await handleTransactionError(error, res)
  }
}
