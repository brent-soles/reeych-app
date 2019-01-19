const passport = require('koa-passport');
const { jwtStrat } = require('./strategies');


/**
 * 
 * @param {koa app instance} app 
 * @param {*} strategies
 * 
 * Called/initialized in base index app
 * Resulatant passport object is attached to ctx.state.passport
 * Need to keep passport convention for maintainability
 */
const applyPassportAuth = (app, strategies) => {
    if(!app || !strategies){
        throw new Error('TypeError: Unable to apply Passport middleware');
    }
    //Inits passport
    app.use(passport.initialize());

    // Applys auth strategies to
    // Passport
    try{
        strategies.forEach(strat => {
            passport.use(strat);
        });
        // Attaches passport object to context of application
        app.context.passport = passport;
    } catch (err){
        throw new Error('TypeError: Unable to iterate over non-iterable');
    }
}

module.exports = {
    applyPassportAuth,
    strategies: [
        jwtStrat
    ]
}
