import 'reflect-metadata'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Book {
  @Field(() => ID)
  id: number

  @Field()
  title: string

  @Field({ nullable: true })
  description?: string
}
