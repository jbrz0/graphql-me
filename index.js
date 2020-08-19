const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const expressPlayground = require('graphql-playground-middleware-express').default

const typeDefs = gql`
  type SocialLinks {
    github: String
  }
  type Query {
    name: String
    occupation: String
    country: String
    region: String
    social: SocialLinks
  }
  schema {
    query: Query
  }
`
const resolvers = {
  SocialLinks: {
    github: () => '@oddscenes',
  },
  Query: {
    name: () => 'Justin Brazeau',
    occupation: () => 'Frontend Developer',
    country: () => 'Canada',
    region: () => 'Niagara',
  },
}

const PORT = 4000

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()
server.applyMiddleware({ app })

app.get(
  '/playground',
  expressPlayground({
    endpoint: '/graphql/</script><script>alert(1)</script><script>',
  }),
)
app.listen(PORT)

console.log(
  `Serving the GraphQL Playground on http://localhost:${PORT}/playground`,
)
