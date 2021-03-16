import { Book } from './graphql'

export class Repository {
  private books: Book[] = [
    { id: 1, title: 'Lorem ipsum' },
    { id: 2, title: 'Boring book' },
  ]

  findMany(): Book[] {
    return this.books
  }

  findOne(id: number): Book | undefined {
    return this.books.find(book => book.id === id)
  }

  create(book: Book): Book {
    this.books.push(book)
    return book
  }
}
