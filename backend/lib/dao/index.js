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

const initSchema = ({ models }) => {
    try{
        let dao = {};
        for(let obj of models){
            const { name, daoObj } = obj;
            // Better way to name 
            dao[name] = daoObj;
        }
        return dao;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    connect,
    initSchema
};