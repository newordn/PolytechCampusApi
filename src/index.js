const {GraphQLServer} = require('graphql-yoga')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const {prisma} = require('./generated/prisma-client')
const resolvers = {
    Query,
    Mutation
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request=> ({...request,prisma})
})
server.start(()=>console.log(`Polytech Campus GraphQl Server Started, is running on http://localhost:4000`))