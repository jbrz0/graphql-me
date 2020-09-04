const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const expressPlayground = require('graphql-playground-middleware-express').default

const typeDefs = gql`
  type SocialLinks {
    twitter: String
    github: String
    twitch: String
  }
  type WorkLinks {
    linkedIn: String
  }
  type Query {
    name: String
    occupation: String
    country: String
    region: String
    website: String
    languages: [String]
    social: SocialLinks!
    work: WorkLinks!
  }
  schema {
    query: Query
  }
`
const resolvers = {
  SocialLinks: {
    twitter: () => '@oddscenes',
    github: () => '@oddscenes',
    twitch: () => '@oddscenes',
  },
  WorkLinks: {
    linkedIn: () => 'linkedin.com/in/justinbrazeau',
  },
  Query: {
    name: () => 'Justin Brazeau',
    occupation: () => 'Frontend Developer',
    country: () => 'Canada',
    region: () => 'Niagara',
    website: () => 'oddscenes.com',
    languages: () => ['English'],
    social: () => ({}),
    work: () => ({}),
  },
}

const PORT = 4000

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()
server.applyMiddleware({ app })

app.use((req, res, next) => {
  res.append('Content-Security-Policy', 'upgrade-insecure-requests')
  next()
})

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
