import { Review } from './graphql'

export class Repository {
  private reviews: Review[] = [
    { id: 1, bookId: 1, rating: 3 },
    { id: 2, bookId: 1, rating: 4 },
    { id: 3, bookId: 2, rating: 4 },
  ]

  async findMany(): Promise<Review[]> {
    return this.reviews
  }

  async findOne(id: number): Promise<Review | undefined> {
    return this.reviews.find(book => book.id === id)
  }

  async create(review: Review): Promise<Review> {
    this.reviews.push(review)
    return review
  }
}
