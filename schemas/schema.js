const { makeExecutableSchema } = require("@graphql-tools/schema")
const { merge } = require("lodash")
const {typeDef: User, resolvers: userResolvers} = require("./user")

const schema = makeExecutableSchema({
    typeDefs: [User],
    resolvers: merge(userResolvers)
})

exports.schema = schema