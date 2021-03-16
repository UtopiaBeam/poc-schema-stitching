import 'reflect-metadata'
import {
  Arg,
  Args,
  Directive,
  FieldResolver,
  Float,
  Int,
  Query,
  Resolver,
  Root,
} from 'type-graphql'
import { Repository } from '../repo'
import { Review } from './types'
import { buildReviewSchema } from './schema'

@Resolver(() => Review)
export class ReviewResolver {
  private repo = new Repository()
  private typeDefs: string

  @Query(() => String)
  async _sdl(): Promise<string> {
    if (!this.typeDefs) {
      this.typeDefs = (await buildReviewSchema()).typeDefs
    }
    return this.typeDefs
  }

  @Query(() => [Review])
  reviews() {
    return this.repo.findMany()
  }

  @Query(() => Review, { nullable: true })
  review(@Arg('id', () => Int) id: number) {
    return this.repo.findOne(id)
  }
}
