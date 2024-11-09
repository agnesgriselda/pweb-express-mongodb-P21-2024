import Book from '../models/book.model';

const borrowBook = async (bookId: string) => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  if (book.qty < 1) {
    throw new Error('Book is not available for borrowing');
  }

  book.qty -= 1;
  await book.save();

  return { currentQty: book.qty };
};

const returnBook = async (bookId: string) => {
  const book = await Book.findById(bookId);
  if (!book) {
    throw new Error('Book not found');
  }

  book.qty += 1;
  await book.save();

  return { currentQty: book.qty };
};

export default { borrowBook, returnBook };