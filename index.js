const { ApolloServer } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
const database = require("./config/DBconnector");
const { PORT } = require("./config/configVars");

database()

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen({ port: PORT || 4000 }).then(({ url }) => {
    console.log(`Servidor listo en la URL ${url}`);
});
