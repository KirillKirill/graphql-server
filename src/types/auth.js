const typeDef = `
    type Person {
        id: ID!
        username: String
        email: String
        password: String
        role: String
    }
    
    extend type Mutation {
        register (username: String, email: String, password: String, role: String): Person!
        login(username: String, password: String): LoginResponse!
    }
    
    type LoginResponse {
        token: String
        user: Person
    }
`

module.exports = {
    typeDef
}