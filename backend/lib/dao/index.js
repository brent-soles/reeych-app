/** Imports */
const mongoose = require('mongoose');

/**
 * 
 * @param {*} object
 *  @param {array} models = models object with the form of:
 *      [{
 *          name: String, // Name of acces object
 *          daoObj: Object // Mongoose model object w/ connection to db
 *      },...]
 */
const initSchema = ({ models }) => {
    try{
        let dao = {};
        
        // Massages models and assigns dao object
        models.forEach((obj) => {
            const { name, daoObj } = obj;
            // Better way to name ?
            dao[name] = daoObj;
        });

        return dao;
    } catch (err) {
        throw new Error(`${err}`)
    }
}


// Inits database, then attaches dao object to ctx
const applyDbToCtx = ({ app, config }) => {
    if(!app || !config) {
        throw new Error(`Cannot pass a null app or config`);
    }

    // Destruct params from config
    const { url, models } = config;
    
    if(!url || !models){
        throw new Error(`url or models parameter cannot be of type: null`);
    }

    try {
        let db = mongoose.connect(url, { useNewUrlParser: true });
        const daoModels = initSchema({ models }); // extracts models & formats to callable object

        if(!daoModels){
            throw new Error(`Models are invalid`);
        }

        // Attaches dao to app context prototype
        app.context.dao = daoModels;
        return db;
    } catch (err) {
        throw new Error(`Cannot init db: ${err}`);
    }


}

module.exports = {
    applyDbToCtx
};
