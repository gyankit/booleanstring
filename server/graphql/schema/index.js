const { buildSchema } = require('graphql');

const graphQlSchema = buildSchema(`
    type User {
        _id: ID!
        name: String
        email: String
        mobile: String
        password: String
        active: Boolean
        type: Int
    }

    type AuthData {
        _id: ID!
        type: Int!
        token: String!
        tokenExpire: Int!
    }

    type BooleanString {
        _id: ID!
        position: String
        skill: String
        location: String
        booleanString: String
        slag: String
        state: Boolean
    }

    input UserInput {
        name: String!
        email: String!
        mobile: String!
        password: String!
    }

    input UserUpdate {
        name: String
        email: String
        mobile: String
        password: String
        active: Boolean
        type: Int
        del: Boolean
    }

    input StringInput {
        position: String!
        skill: String!
        location: String!
        booleanString: String!
        slag: String!
    }

    input StringUpdate {
        position: String
        Skill: String
        location: String
        booleanString: String!
        slag: String!
        state: Boolean!
        del: Boolean
    }

    type RootQuery {
        login(email: String!, password: String!): AuthData
        user(id: String): [User]
        booleanString(id: String, slag: String, state: Boolean): [BooleanString]
    }

    type RootMutation {
        createUser(userInput: UserInput!): User
        updateUser(id: String!, update: UserUpdate!): User
        createBooleanString(stringInput: StringInput!): BooleanString
        updateBooleanString(id: String!, update: StringUpdate!): BooleanString
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }
`);

module.exports = graphQlSchema;