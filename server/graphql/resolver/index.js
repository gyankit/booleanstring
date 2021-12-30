const userResolver = require('./user');
const booleanStringResolver = require('./booleanString');

module.exports = {
    ...userResolver,
    ...booleanStringResolver
};