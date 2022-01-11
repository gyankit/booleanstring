const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const BooleanString = require('../../models/booleanString');
const { multiResponse } = require('../../helper/response');

const queryResolver = {

    booleanString: async (args, req) => {
        try {
            const booleanString = await BooleanString.find(args);
            return multiResponse(booleanString);
        } catch (err) {
            throw err;
        }
    },

    user: async (args, req) => {
        try {
            if (req.isAuth) {
                if (req.uid === args._id || req.utype === 1 || req.utype === 0) {
                    const user = await User.find(args);
                    return multiResponse(user);
                }
            }
            throw new Error(401);
        }
        catch (err) {
            throw err;
        }
    },

    login: async (args, req) => {
        try {
            if (req.isAuth) {
                throw new Error('Already LoggedIn');
            }
            const user = await User.findOne({ email: args.email });
            if (!user) {
                throw new Error('Wrong Email');
            }
            const isPasswordMatch = await bcrypt.compare(args.password, user.password);
            if (!isPasswordMatch) {
                throw new Error('Wrong Password');
            }
            if (!user.active) {
                throw new Error('Login is disable! Please check with Administrator.')
            }
            const tokenData = {
                _id: user.id,
                type: user.type
            }
            const token = jwt.sign({ data: tokenData }, 'specialsecretkey', { expiresIn: '2h' });
            const response = { ...tokenData, token: token, tokenExpire: 2 };
            return response;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = queryResolver;