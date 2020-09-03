const { merge } = require("lodash")
const { resolvers: authResolver } = require("./auth")
const { resolvers: userResolver } = require("./user")

const resolvers = merge(authResolver, userResolver)

module.exports = {
    resolvers
}