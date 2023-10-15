import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'
import { User, Village } from './types/generated/types'
import { villages } from './data/villages'

// ログイン実施済みか
var logined = true

const sleep = (time: any) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

const schema = loadSchemaSync('./schema/schema.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const resolvers = {
  Query: {
    villages: async (): Promise<Village[]> => {
      await sleep(1000)

      return villages()
    },
  },
  Mutation: {
    initialize: async (_: unknown, args: {}): Promise<User | null> => {
      var villageNumbers: number[] = []
      await sleep(1000)

      if (logined) {
        villageNumbers.push(1, 2, 3)
      }
      return {
        id: 'bfd5677d-6ac6-49db-8904-bd65620785dd',
        villageNumbers: villageNumbers,
      }
    },
  },
}

// You can add resolvers to that schema
const schemaWithResolvers = addResolversToSchema({ schema, resolvers })

// Create a express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
const app = express()
app.all('/api/graphql', createHandler({ schema: schemaWithResolvers }))

app.listen({ port: 5000 })
console.log('Listening to port 5000')
