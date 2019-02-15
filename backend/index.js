/** Config import */
require('dotenv').config({path: './dev.server.env'})

/** Server defs */
const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
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
        return;
    }
    return next();
});

try{
    // Adds auth layer to ctx
    const { applyPassportAuth, strategies } = require('./lib/auth');
    applyPassportAuth(app, strategies);

    // DAO initialization
    const dao = require('./lib/dao');
    // Initializes db, connects Models to DAO
    // Attaches DAO to ctx
    dao.init( {app });

    // Server initialization
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        context: async ({ ctx }) => ctx // Attaches ctx to resolver context, can destructure at resolver level
    });
    server.applyMiddleware({ app });
    

    // Adds a layer of authentication in order to GET UI
    // TODO: Split this into a GET for a route
    app.use(async (ctx, next) => {
        const { passport } = ctx;
        await passport.authenticate('jwt', {session: false}, async (err, { authToken }, info) => {
            console.log(authToken);
            if(authToken.accessLvl === 'admin'){
                console.log('sending/authing');
                return next();
            }
            return;
        })(ctx, next);
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
