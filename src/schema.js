const { makeExecutableSchema } = require("@graphql-tools/schema")
const { typeDefs } = require("./types/index")
const { resolvers } = require("./resolvers/index")

const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})

exports.schema = schema