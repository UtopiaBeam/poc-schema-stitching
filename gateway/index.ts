import { ApolloServer } from 'apollo-server'
import makeGatewaySchema from './lib/make-gateway-schema'

async function createGateway() {
  const schema = await makeGatewaySchema()

  return new ApolloServer({ schema })
}

export default createGateway
