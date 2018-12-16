/** Server defs */
const Koa = require('koa');
const app = new Koa();
const { ApolloServer, gql } = require('apollo-server-koa');

/** Typedefs/Resolver Imports */

const resolvers = require('./lib/resolvers');
const typeDefs = require('./lib/typeDefs');

/** Security Middlewares */
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
app.use(helmet());


/** Server initialization */
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});