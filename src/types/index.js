const {typeDef: authTypes} = require("./auth")
const {typeDef: userTypes} = require("./user")

const Query = `
    type Query {
        _empty: String
    }
`;

const Mutation = `
    type Mutation {
       _empty: String 
    }
`;

const typeDefs = [Query, Mutation, authTypes, userTypes];

module.exports = {
    typeDefs
}