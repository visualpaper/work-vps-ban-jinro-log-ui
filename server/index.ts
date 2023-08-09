import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'

const sleep = (time: any) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const schema = loadSchemaSync('schema.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const resolvers = {
  Query: {},
  Mutation: {},
}

// You can add resolvers to that schema
const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

// Create a express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
const app = express()
app.all('/api/graphql', createHandler({ schema: schemaWithResolvers }))

app.listen({ port: 5000 })
console.log('Listening to port 5000')
