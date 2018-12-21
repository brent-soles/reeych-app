/** Imports */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/** Config */
const connect = ({ url, models }) => {
    //If neither, we have a problem
    if( !url || !models ) {
        return null;
    }

    try{
        return mongoose.connect(url, { useNewUrlParser: true });
    } catch (err){
        console.log(err);
        return false;
    }

}

const initSchema = ({ models }, appCtx) => {
    try{
        for(sch in models){
            const {name, schema} = models[sch]
            appCtx[name] = mongoose.model(name, schema);
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    connect,
    initSchema
};