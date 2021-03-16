import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchingDirectives } from '@graphql-tools/stitching-directives'
import { buildTypeDefsAndResolvers } from 'type-graphql'
import { BookResolver } from '.'

export async function buildBookSchema() {
  const {
    allStitchingDirectives,
    stitchingDirectivesTypeDefs,
    stitchingDirectivesValidator,
  } = stitchingDirectives()

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [BookResolver],
    // directives: allStitchingDirectives,
  })

  const schema = makeExecutableSchema({
    typeDefs: `${stitchingDirectivesTypeDefs}\n${typeDefs}`,
    resolvers,
    schemaTransforms: [stitchingDirectivesValidator],
  })

  return { typeDefs, schema }
}
