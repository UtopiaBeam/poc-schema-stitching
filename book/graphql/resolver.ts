import 'reflect-metadata'
import { Arg, Directive, Int, Query, Resolver } from 'type-graphql'
import { Repository } from '../repo'
import { Book } from './types'
import { buildBookSchema } from './schema'

@Resolver(() => Book)
export class BookResolver {
  private repo = new Repository()
  private typeDefs: string

  @Query(() => String)
  async _sdl(): Promise<string> {
    if (!this.typeDefs) {
      this.typeDefs = (await buildBookSchema()).typeDefs
    }
    return this.typeDefs
  }

  @Directive('@merge(keyField: "id")')
  @Query(() => [Book])
  books() {
    return this.repo.findMany()
  }

  @Directive('@merge(keyField: "id")')
  @Query(() => Book, { nullable: true })
  book(@Arg('id', () => Int) id: number) {
    return this.repo.findOne(id)
  }
}
