/**
 * JWT Strategy:
 * Main strategy for authenticating requests
 * 
 * Documentation: http://www.passportjs.org/packages/passport-jwt/
 * 
 * This will be at the root of each context request to the graphql endpoint for
 * some reads, all modifies and writes
 * The reason being: graphql endpoint is the only one that has to do w/ data
 */
const { JWT_SALT } = process.env; //require('dotenv').config({path: '../../dev.server.env'}).parsed;
const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');

const stratOptions = {
    jwtFromRequest: (ctx) => {
        // tokenPrim == undecrypted token
        const tokenPrim = ctx.cookies.get('reeych');
        // Check to see if token is falsy
        if(!tokenPrim){
            // Sets cookie to null for any future requests
            ctx.cookies.set('reeych', null, {
                signed: process.env.NODE_ENV !== 'production' ? false : true
            })
            return null;
        }
        return tokenPrim;
    },
    secretOrKey: JWT_SALT,
    // issuer: "reeych.com",
    // audience: "<space id>"
}


module.exports = {
    // Returns function to pass to passport.use()
    jwtStrat: new JwtStrategy(stratOptions, (jwtPayload, done) => {
        // Token is passed in, either: verified || null
        // If token valid, then not null/falsy
        // Otherwise is falsy
        if(!jwtPayload){
            // Will return user as false
            // Used to indicate that user must sign in
            return done(null, false, {message: 'Invalid authentication token'});
        }
        // Will return a token, and pass to passport.authenticate() callback
        return done(null, { authToken: jwtPayload });
    })
}
