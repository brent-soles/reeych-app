/** Config import */
require('dotenv').config({path: './dev.server.env'})

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

/** DB Connection */
const dao = require('./lib/dao');
const { models } = require('./lib/dao/models');
const dbconfig = {
    url: process.env.DB_URL,
    models
}

/** Inits db, and adds models to db object */
const db = dao.connect(dbconfig);
dao.initSchema(dbconfig, db);

/** Server initialization */
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: async () => ({ db }) //Adds db to context
});
server.applyMiddleware({ app });




/** Let the serving... begin! */
app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});





