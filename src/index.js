const {GraphQLServer} = require('graphql-yoga')
const express = require('express')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Crew = require('./resolvers/Crew')
const Post = require('./resolvers/Post')
const User = require('./resolvers/User')
const {prisma} = require('./generated/prisma-client')
const {storeUpload} = require('./helpers/upload')
const {GraphQLUpload} = require('graphql-upload')
const {makeExecutableSchema} = require('graphql-tools')
const {typeDefs} = require('./schema.graphql.js')
const resolvers = {
    Query,
    Mutation,
    Crew,
    Post,
    User,
    Upload: GraphQLUpload
}
const schema = makeExecutableSchema({typeDefs,resolvers})
const server = new GraphQLServer({
    schema,
    context: request=> ({...request,prisma,storeUpload})
    
})
server.express.use('/uploads',express.static("uploads"))
server.start(()=>console.log(`Polytech Campus GraphQl Server Started, is running on http://localhost:4000`))