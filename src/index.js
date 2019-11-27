const {GraphQLServer} = require('graphql-yoga')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Crew = require('./resolvers/Crew')
const Post = require('./resolvers/Post')
const User = require('./resolvers/User')
const {prisma} = require('./generated/prisma-client')
const resolvers = {
    Query,
    Mutation,
    Crew,
    Post,
    User
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request=> ({...request,prisma})
})
server.start(()=>console.log(`Polytech Campus GraphQl Server Started, is running on http://localhost:4000`))