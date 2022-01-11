const mongoose = require('mongoose');

const MONGO_USER = "gyankit";
const MONGO_PASS = "gyankit";
const MONGO_CLUSTER = "freecluster";
const MONGO_DB = "string-boolean";

const _URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}.ruqzn.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

module.exports = {
    connect: async () => {
        await mongoose.connect(_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('MongoDB connnection successful!'))
            .catch(err => console.error(_URL + err));
    },

    disconnect: async () => {
        await mongoose.connection.close();
        console.warn('MongoDB connnection closed!');
    }
};