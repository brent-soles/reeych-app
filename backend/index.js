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
const session = require('koa-session');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport');

// app.keys=['test']
// app.use(session(app));

app.use(bodyParser());
app.use(helmet());
//app.use(passport.initialize());
// app.use(passport.session())

// passport.serializeUser((user, done) => {
//     done(null, null);
// })
//app.use(static('login/'));

app.use(async (ctx, next) => {

    if(ctx.path === '/login'){
        if(ctx.request.query.name){
            ctx.cookies.set('auth', jwt.sign({username: ctx.request.query.name}, 'salt'));
            ctx.redirect('/');
        } else {
            console.log(ctx.path);
            await send(ctx, ctx.path, {
                root: './templates/',
                index: 'index.html'
            });
        }
        
        return;
    }

    // const token = jwt.verify(ctx.cookies.get('auth'), 'salt');
    // if(!token){
    //     //ctx.redirect('/login');
    //     console.log("no tok");
    //     return 400;
    // }

    if(ctx.path === '/secret'){
        console.log(ctx.cookies.get('auth'));
        console.log(jwt.verify(ctx.cookies.get('auth'), 'salt'))
        //console.log(jwt.verify(ctx.cookies.get('auth'), 'satl'))
    }

    console.log("next");
    return next();
});


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


    /** Serve react app */
    let LocalStrategy = require('passport-local').Strategy;

    passport.use(new LocalStrategy( function(username, password, done){
        console.log("USERNAME")
        console.log(username);
        console.log("PASS")
        console.log(password)
        if(username === 'brent'){
                return done(null, { username });
            }

            return done(null, false, {message: 'it went wrong'});
        })
    )

    let JwtStrategy = require('passport-jwt').Strategy;
    let ExtractJwt = require('passport-jwt').ExtractJwt;

    let opts = {
        jwtFromRequest: function(ctx) {
            const tk = ctx.cookies.get('auth');
            return tk;
        },
        secretOrKey: 'salt'
    }
    passport.use(new JwtStrategy(opts, function(payload, done){
            console.log("PAYLOAD");
            console.log(payload);
            if(payload.username === 'brent'){
                return done(null, payload);
            } else {
                return done(null, false, {message: "no jwt"});
            }
        })
    )

    
    app.use(async (ctx, next) => {
        const tk = jwt.verify(ctx.cookies.get('auth'), 'salt');
        console.log("TK");
        console.log(tk);
        await passport.authenticate('jwt', {session: false}, (err, user, info) => {
            console.log(`~~~~~~~`);
            console.log(user);
            console.log(info);
            return;
        })(ctx);

        await next();
    })

    // app.use(router.routes()).use(router.allowedMethods());

    app.use((ctx, next) => {
        return next();
    })

    // Works...
    // calls on root
    app.use(static('app/'));

    

    // router.get('/static', async (ctx, next) => {
    //     console.log("hey")
    //     await send(ctx, ctx.path, {
    //         root: '/app'
    //     })
    //     next();
    // })



    /** Let the serving... begin! */
    app.listen({ port: 7000 }, () => {
        console.log(`Server ready at http://localhost:7000${server.graphqlPath}`);
    });
} catch (err){
    console.log(err);
    return -1;
}
