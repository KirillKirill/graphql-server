const typeDef = `
    type User {
        id: ID!
        username: String
        email: String
        password: String
        role: String
    }
    
    extend type Query {
        user(id: ID!): User
        users: [User]
    }
    
    extend type Mutation {
        update(id: ID!, username: String, email: String, password: String, role: String): User!
        delete(id: ID!): User!
    }
`

module.exports = {
    typeDef
}