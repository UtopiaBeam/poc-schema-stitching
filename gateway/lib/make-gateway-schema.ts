import { stitchSchemas } from '@graphql-tools/stitch'
import { stitchingDirectives } from '@graphql-tools/stitching-directives'
import { buildSchema } from 'graphql'
import makeRemoteExecutor from './make-remote-executor'

const { stitchingDirectivesTransformer } = stitchingDirectives()

async function makeGatewaySchema() {
  const bookExec = makeRemoteExecutor('http://localhost:3001')
  const reviewExec = makeRemoteExecutor('http://localhost:3002')

  return stitchSchemas({
    subschemaConfigTransforms: [stitchingDirectivesTransformer],
    subschemas: [
      {
        schema: await fetchRemoteSchema(bookExec),
        executor: bookExec,
      },
      {
        schema: await fetchRemoteSchema(reviewExec),
        executor: reviewExec,
      },
    ],
  })
}

async function fetchRemoteSchema(executor) {
  const { data } = await executor({ document: '{ _sdl }' })
  return buildSchema(data._sdl)
}

export default makeGatewaySchema
