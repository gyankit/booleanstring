const queryResolver = require('./query');
const mutationResolver = require('./mutation');

module.exports = {
    ...queryResolver,
    ...mutationResolver
};