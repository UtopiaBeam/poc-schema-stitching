import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchingDirectives } from '@graphql-tools/stitching-directives'
import { buildTypeDefsAndResolvers } from 'type-graphql'
import { ReviewResolver } from '.'

export async function buildReviewSchema() {
  const {
    allStitchingDirectives,
    stitchingDirectivesTypeDefs,
    stitchingDirectivesValidator,
  } = stitchingDirectives()

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [ReviewResolver],
    // directives: allStitchingDirectives,
  })

  const schema = makeExecutableSchema({
    typeDefs: `${stitchingDirectivesTypeDefs}\n${typeDefs}`,
    resolvers,
    schemaTransforms: [stitchingDirectivesValidator],
  })

  return { typeDefs, schema }
}
