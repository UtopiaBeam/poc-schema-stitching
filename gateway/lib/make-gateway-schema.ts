import { stitchSchemas } from '@graphql-tools/stitch'
import { stitchingDirectives } from '@graphql-tools/stitching-directives'
import { filterSchema, pruneSchema } from '@graphql-tools/utils'
import { buildSchema } from 'graphql'
import makeRemoteExecutor from './make-remote-executor'

const { stitchingDirectivesTransformer } = stitchingDirectives()

async function makeGatewaySchema() {
  const bookExec = makeRemoteExecutor('http://localhost:3001')
  const reviewExec = makeRemoteExecutor('http://localhost:3002')

  const schema = stitchSchemas({
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

  const publicSchema = pruneSchema(
    filterSchema({
      schema,
      rootFieldFilter: (_, fieldName) => !fieldName.startsWith('_'),
      fieldFilter: (_, fieldName) => !fieldName.startsWith('_'),
      argumentFilter: (_, __, argName) => !argName.startsWith('_'),
    })
  )

  return publicSchema
}

async function fetchRemoteSchema(executor) {
  const { data } = await executor({ document: '{ _sdl }' })
  return buildSchema(data._sdl)
}

export default makeGatewaySchema
