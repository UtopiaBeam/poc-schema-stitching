import 'reflect-metadata'
import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Review {
  @Field(() => ID)
  id: number

  @Field(() => Int)
  bookId: number

  @Field(() => Int)
  rating: number
}

@ObjectType()
export class Book {
  @Field(() => ID)
  id: number

  @Field(() => [Review])
  reviews: Review[]
}
