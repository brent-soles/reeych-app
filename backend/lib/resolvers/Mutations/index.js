const cardMutations = require('./cardMutations');
const spaceMutations = require('./spaceMutations');
const userMutations = require('./userMutations');

module.exports = {
    ...cardMutations,
    ...spaceMutations,
    ...userMutations,
}