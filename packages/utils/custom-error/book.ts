import { ErrorType } from '../types'

export const Book: Record<number, ErrorType> = {
  2000: {
    classId: 'Book',
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
    classId: 'Book',
    code: 2001,
    statusCode: 400,
    title: {
      en_US: 'Validation Error',
      tr_TR: 'Doğrulama Hatası',
    },
    message: {
      en_US: 'The provided data does not match the required schema.',
      tr_TR: 'Sağlanan veriler gerekli şema ile uyuşmuyor.',
    },
  },
  2002: {
    classId: 'Book',
    code: 2002,
    statusCode: 400,
    title: {
      en_US: 'Invalid Book ID',
      tr_TR: "Geçersiz Kitap ID'si",
    },
    message: {
      en_US: 'The provided book ID is invalid.',
      tr_TR: "Sağlanan kitap ID'si geçersiz.",
    },
  },
  2003: {
    classId: 'Book',
    code: 2003,
    statusCode: 404,
    title: {
      en_US: 'Book Not Found',
      tr_TR: 'Kitap Bulunamadı',
    },
    message: {
      en_US: 'The requested book could not be found.',
      tr_TR: 'İstenen kitap bulunamadı.',
    },
  },
  2004: {
    classId: 'Book',
    code: 2004,
    statusCode: 404,
    title: {
      en_US: 'Borrowed Book Not Found',
      tr_TR: 'Ödünç Alınan Kitap Bulunamadı',
    },
    message: {
      en_US: 'No borrowed book record found for the given user and book.',
      tr_TR: 'Belirtilen kullanıcı ve kitap için ödünç alınan kitap kaydı bulunamadı.',
    },
  },
  2005: {
    classId: 'Book',
    code: 4002,
    statusCode: 404,
    title: {
      en_US: 'Book Already Borrowed',
      tr_TR: 'Kitap Zaten Ödünç Alınmış',
    },
    message: {
      en_US: 'The book is already borrowed by another user.',
      tr_TR: 'Kitap başka bir kullanıcı tarafından ödünç alınmış.',
    },
  },
}
