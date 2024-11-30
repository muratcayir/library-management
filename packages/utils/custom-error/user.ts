import { ErrorType } from '../types'

export const User: Record<number, ErrorType> = {
  3001: {
    classId: 'User',
    code: 3001,
    statusCode: 400,
    title: {
      en_US: 'Validation Error',
      tr_TR: 'Doğrulama Hatası',
    },
    message: {
      en_US: 'The provided user data does not match the required schema.',
      tr_TR: 'Sağlanan kullanıcı verileri gerekli şema ile uyuşmuyor.',
    },
  },
  3002: {
    classId: 'User',
    code: 3002,
    statusCode: 404,
    title: {
      en_US: 'User Not Found',
      tr_TR: 'Kullanıcı Bulunamadı',
    },
    message: {
      en_US: 'The requested user could not be found.',
      tr_TR: 'İstenen kullanıcı bulunamadı.',
    },
  },
  3003: {
    classId: 'User',
    code: 3003,
    statusCode: 400,
    title: {
      en_US: 'Invalid User ID',
      tr_TR: "Geçersiz Kullanıcı ID'si",
    },
    message: {
      en_US: 'The provided user ID is invalid.',
      tr_TR: "Sağlanan kullanıcı ID'si geçersiz.",
    },
  },
  3004: {
    classId: 'User',
    code: 3004,
    statusCode: 409,
    title: {
      en_US: 'User Already Exists',
      tr_TR: 'Kullanıcı Zaten Mevcut',
    },
    message: {
      en_US: 'A user with the given name already exists.',
      tr_TR: 'Belirtilen isimde bir kullanıcı zaten mevcut.',
    },
  },
}
