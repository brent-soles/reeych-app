const cardQueries = require('./cardQueries');
const spaceQueries = require('./spaceQueries');
const userQueries = require('./userQueries');

module.exports = {
    ...cardQueries,
    ...spaceQueries,
    ...userQueries,
}