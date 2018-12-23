/** Config import */
require('dotenv').config({path: './dev.server.env'})

/** Server defs */
const Koa = require('koa');
const app = new Koa();
const { ApolloServer} = require('apollo-server-koa');
const subdomain = require('koa2-subdomain');

/** Typedefs/Resolver Imports */
const resolvers = require('./lib/resolvers');
const typeDefs = require('./lib/typeDefs');

/** Security Middlewares */
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
app.use(helmet());
app.use(subdomain('api', () => {
    next();
}));

/** DB Connection */
const dao = require('./lib/dao');
const { models } = require('./lib/dao/models');
const dbconfig = {
    url: process.env.DB_URL,
    models
}

/** Inits db, and adds models to db object */
dao.connect(dbconfig);

/** Server initialization */
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: { DAO: dao.initSchema(dbconfig)} //Adds db to context
});
server.applyMiddleware({ app });

/** Let the serving... begin! */
app.listen({ port: 7000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
});