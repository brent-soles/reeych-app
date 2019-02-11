const CardMutations = require('./CardMutations');
const SpaceMutations = require('./SpaceMutations');
const UserMutations = require('./UserMutations');

module.exports = {
    ...CardMutations,
    ...SpaceMutations,
    ...UserMutations
}