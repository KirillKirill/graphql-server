const typeDef = `
    input RegisterInput {
        username: String
        email: String
        password: String
        role: String
    }
    
    type LoginResponse {
        token: String
        user: User
    }
    
    extend type Mutation {
        register (input: RegisterInput): User!
        login(username: String, password: String): LoginResponse!
    }
`

module.exports = {
    typeDef
}