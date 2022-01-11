const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const db = require('./config/database');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolver = require('./graphql/resolver/index');

const Auth = require('./middleware/auth');

const app = express();
db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})

app.use(Auth);

app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true
}));

module.exports = app;
