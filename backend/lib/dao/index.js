/** Imports */
const mongoose = require('mongoose');

/* Models Import */
const { models } = require('./models');

/**
 * 
 * @param {*} object
 * @param {array} models = models object with the form of:
 *      [{
 *          name: String, // Name of access object
 *          daoObj: Object // Mongoose model object w/ connection to db
 *      },...]
 */
const attachModels = ({ models, dao }) => {
    try{
        if(!dao){
            throw new Error('TypeErro: Cannot have null or undefined dao')
        }
        // Massages models and assigns dao object
        models.forEach((obj) => {
            const { name, daoObj } = obj;
            // Better way to name ?
            // Current name is <modelName>
            // Access for a User would then be: dao.User.<function>(args)
            dao[name] = daoObj;
        });
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    // Returns function to pass initialize and attach dao object to context
    init: (function(models, url){
        // Connects to MongoInstance
        // Inits dao object then applies dao to ctx prototype, context
        try {
            mongoose.connect(url, { useNewUrlParser: true });
            return function({ app }) {
                app.context.dao = {};
                attachModels({ models, dao: app.context.dao });
            }
        } catch (err) {
            throw new Error(err);
        }
    })(models, process.env.DB_URL)
};
