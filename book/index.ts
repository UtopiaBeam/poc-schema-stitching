import { ApolloServer } from 'apollo-server'
import { buildBookSchema } from './graphql'

async function createBookService() {
  const { schema } = await buildBookSchema()
  const server = new ApolloServer({ schema })

  return server
}

export default createBookService
