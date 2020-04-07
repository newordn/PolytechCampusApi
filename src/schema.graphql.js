
const {GraphQLUpload} = require('graphql-upload')
const typeDefs = `
scalar Upload
type Query{
    info:String!
    users: [User!]!
    crews: [Crew!]!
    posts: [Post!]!
    crew(id:String!): Crew!
    post(id:String!): Post!
    postsByCrew(crewId:String!):[Post!]!
}
type Mutation{
    logIn(matricule:String!,password:String!,code:String!): AuthPayload
    signUp(name:String!,matricule:String!,email:String!,phone:String!,filiere:String!,option:String!,password:String!): AuthPayload
    crew(title:String!,description:String!,users:[String]): Crew
    post(title:String!,description:String!,files:[Upload!]!,belongTo:String!): Post!
}
type Post{
    id: ID!
    title: String!
    description: String!
    files: [String!]!
    postedBy: User!
    belongTo: Crew!
    creationDate: String!

}
type AuthPayload{
    token: String
    user: User
}
type Crew{
    id: ID!
    title: String!
    description:String!
    users: [User]
    posts:[Post]
}
type User{
    id: ID!
    name:String!
    matricule: String!
    email: String!
    phone:String!
    role:String!
    code:String!
    filiere: String!
    option: String!
    password:String!
    crews: [Crew]
    posts:[Post]
}
`
module.exports ={
    typeDefs
}
