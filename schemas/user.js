const { db } = require("../pgAdaptor");
const bcrypt = require('bcrypt')

const typeDef = `
    type User {
        id: ID!
        username: String
        email: String
        password: String
        role: String
    }
    
    type Query {
        user(id: ID!): User
        users: [User]
    }
    
    type Mutation {
        register (username: String, email: String, password: String, role: String): User!
        login(username: String, password: String): LoginResponse!
    }
    
    type LoginResponse {
        token: String
        user: User
    }
`

const getUserById = async function(_, {id}) {
    const res = await db.query('select * from users where id = $1', [id])
    return res.rows[0]
}

const getUsers = async function() {
    const res = await db.query('select * from users');
    return res.rows
}

const createUser = async function(_, args){
    const {username, email, password} = args
    const hashedPassword = await bcrypt.hash(password, 10)
    const res = await db.query('INSERT INTO users(username, email, password, role) VALUES($1, $2, $3, $4)',
        [username, email, hashedPassword, 'user'])

    return res.rows[0]
}

const resolvers = {
    Query: {
        user: getUserById,
        users: getUsers
    },
    Mutation: {
        register: createUser
    }
}

module.exports = {
    typeDef,
    resolvers
}