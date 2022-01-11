const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const BooleanString = require('../../models/booleanString');
const { singleResponse } = require('../../helper/response');

const mutationResolver = {

    createBooleanString: async (args, req) => {
        try {
            if (!req.isAuth) {
                throw new Error(401);
            }
            const booleanString = new BooleanString({
                field: args.stringInput.field,
                booleanString: args.stringInput.booleanString,
            });
            const result = await booleanString.save();
            return singleResponse(result);
        } catch (err) {
            throw err;
        }
    },

    createUser: async (args, req) => {
        try {
            if (req.isAuth) {
                if (req.utype === 1 || req.utype === 0) {
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
            }
            throw new Error(401);
        }
        catch (err) {
            throw err;
        }
    },

    updateBooleanString: async (args, req) => {
        try {
            if (req.isAuth) {
                if (req.utype === 1 || req.utype === 0) {
                    let booleanString = await BooleanString.findById(args._id);
                    if (args.update.del) {
                        await BooleanString.deleteOne({ "_id": args._id });
                    } else {
                        await BooleanString.updateOne({ "_id": args._id }, args.update);
                        booleanString = await BooleanString.findById(args._id);
                    }
                    return singleResponse(booleanString);
                }
            }
            throw new Error(401);
        } catch (err) {
            throw err;
        }
    },

    updateUser: async (args, req) => {
        try {
            let user = await User.findById(args._id);
            if (req.isAuth) {
                if (req.uid === args._id) {
                    if (args.update.del) {
                        throw new Error(401);
                    }
                    await User.updateOne({ "_id": args._id }, args.update);
                    user = await User.findById(args._id);
                    return singleResponse(user);
                }
                else if (req.utype === 1 || req.utype === 0) {
                    if (args.update.del) {
                        await User.deleteOne({ "_id": args._id });
                    } else {
                        await User.updateOne({ "_id": args._id }, args.update);
                        user = await User.findById(args._id);
                    }
                    return singleResponse(user);
                }
            }
            throw new Error(401);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = mutationResolver;