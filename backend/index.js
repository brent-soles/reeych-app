/** Config import */
require('dotenv').config({path: './dev.server.env'})

/** Server defs */
const Koa = require('koa');
const app = new Koa();
const { ApolloServer} = require('apollo-server-koa');

/** Typedefs/Resolver Imports */
const resolvers = require('./lib/resolvers');
const typeDefs = require('./lib/typeDefs');

/** Security Middlewares */
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
app.use(helmet());

/** DB Connection */
const { applyDbToCtx } = require('./lib/dao');
const { models } = require('./lib/dao/models');
const dbconfig = {
    url: process.env.DB_URL,
    models
}

try{
    // Inits the db, then attches dao object to
    // request context
    const db = applyDbToCtx({
        app,
        config: dbconfig
    });

    if(!db){
        throw new Error(`Database error with applying to context: ${db}`)
    }

    /** Server initialization */
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: ({ ctx }) => ctx // Attaches ctx to resolver context
    });
    server.applyMiddleware({ app });

    /** Let the serving... begin! */
    app.listen({ port: 7000 }, () => {
        console.log(`Server ready at http://localhost:7000${server.graphqlPath}`);
    });
} catch (err){
    console.log(err);
    return -1;
}
