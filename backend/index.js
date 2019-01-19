/** Config import */
require('dotenv').config({path: './dev.server.env'})

/** Server defs */
const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const send = require('koa-send');
const path = require('path');
const app = new Koa();
const router = new Router();
const { ApolloServer} = require('apollo-server-koa');

/** Typedefs/Resolver Imports */
const resolvers = require('./lib/resolvers');
const typeDefs = require('./lib/typeDefs');

/** Security Middlewares */
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');

const jwt = require('jsonwebtoken');

app.keys=[process.env.COOKIE_KEY]
app.use(bodyParser());
app.use(helmet());

app.use(async (ctx, next) => {

    // FOR TESTING
    if(ctx.path === '/gettoken'){
        
            ctx.cookies.set('reeych-auth', jwt.sign({ accessLvl: `admin` }, process.env.JWT_SALT));
            ctx.redirect('/');
        
        // } else {
            
        //     await send(ctx, ctx.path, {
        //         root: './templates/',
        //         index: 'index.html'
        //     });
        // }
        
        return;
    }
    return next();
});




try{
    // Adds auth layer to ctx
    const { applyPassportAuth, strategies } = require('./lib/auth');
    applyPassportAuth(app, strategies);

    /** DB Connection */
    const { applyDbToCtx } = require('./lib/dao');
    const { models } = require('./lib/dao/models');
    const dbconfig = {
        url: process.env.DB_URL,
        models
    }
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
        context: ({ ctx }) => {
            console.log("CTX")
            
            return ctx;
        } // Attaches ctx to resolver context
    });
    server.applyMiddleware({ app });
    
    app.use(async (ctx, next) => {
        const { passport } = ctx;
        //console.log(ctx.cookies);
        await passport.authenticate('jwt', {session: false}, async (err, { authToken }, info) => {
            console.log(authToken);
            if(authToken.accessLvl === 'admin'){
                console.log('sending/authing');
                return next();
            }
            return;
        })(ctx, next);
        console.log('next');
    });

    app.use(static('app'));

    /** Let the serving... begin! */
    app.listen({ port: 7000 }, () => {
        console.log(`Server ready at http://localhost:7000${server.graphqlPath}`);
    });
} catch (err){
    console.log(err);
    return -1;
}
