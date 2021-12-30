const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { singleResponse, multiResponse } = require('../../helper/response');

const userResolver = {

    user: async (args) => {
        try {
            const user = await User.find(args);
            return multiResponse(user);
        }
        catch (err) {
            throw err;
        }
    },

    login: async (args) => {
        try {
            // let authenticated = false;
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
                id: user.id,
                type: user.type
            }
            const token = jwt.sign({ data: tokenData }, 'specialsecretkey', { expiresIn: '2h' });
            // authenticated = true;
            const response = { ...tokenData, token: token, tokenExpire: 2 };
            return response;
        }
        catch (err) {
            throw err;
        }
    },

    createUser: async (args) => {
        try {
            const hashPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                name: args.userInput.name,
                email: args.userInput.email,
                mobile: args.userInput.mobile,
                password: hashPassword,
            });
            const result = await user.save();
            return singleResponse(result);
        }
        catch (err) {
            throw err;
        }
    },

    updateUser: async (args) => {
        console.log(args)
        try {
            let user = await User.findById(args.id);
            if (user.type === 0) {
                throw new Error('Not Authorized');
            }
            if (args.update.del) {
                await User.deleteOne({ "_id": args.id });
            } else {
                await User.updateOne({ "_id": args.id }, args.update);
                user = await User.findById(args.id);
            }
            return singleResponse(user);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = userResolver;