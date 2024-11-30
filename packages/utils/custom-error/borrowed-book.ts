import { ErrorType } from '../types'

export const BorrowedBook: Record<number, ErrorType> = {
  2000: {
    classId: 'BorrowedBook',
    code: 2000,
    statusCode: 400,
    title: {
      en_US: 'Warning!',
      tr_TR: 'Uyarı !',
    },
    message: {
      en_US: 'An error occured',
      tr_TR: 'Genel hata',
    },
  },
  2001: {
    classId: 'BorrowedBook',
    code: 2000,
    statusCode: 400,
    message: {
      en_US: 'The email address you entered ({{email}}) is already registered with us. Please use a different email.',
      tr_TR: 'Girdiğin ({{email}}) e-posta adresi zaten bizde kayıtlı. Lütfen farklı bir e-posta kullan.',
    },
    title: {
      en_US: 'Email Already Registered',
      tr_TR: 'E-posta Zaten Kayıtlı',
    },
  },
}
