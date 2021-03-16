import { ApolloServer } from 'apollo-server'
import { buildReviewSchema } from './graphql'

async function createReviewService() {
  const { schema } = await buildReviewSchema()
  const server = new ApolloServer({ schema })

  return server
}

export default createReviewService
