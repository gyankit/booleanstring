const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const BooleanString = require('../../models/booleanString');
const { singleResponse } = require('../../helper/response');

const mutationResolver = {

    createBooleanString: async (args) => {
        try {
            const booleanString = new BooleanString({
                position: args.stringInput.position,
                skill: args.stringInput.skill,
                location: args.stringInput.location,
                booleanString: args.stringInput.booleanString,
                slag: args.stringInput.slag,
            });
            const result = await booleanString.save();
            return singleResponse(result);
        } catch (err) {
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

    updateBooleanString: async (args) => {
        try {
            let booleanString = await BooleanString.findById(args._id);
            if (args.update.del) {
                await BooleanString.deleteOne({ "_id": args._id });
            } else {
                await BooleanString.updateOne({ "_id": args._id }, args.update);
                booleanString = await BooleanString.findById(args._id);
            }
            return singleResponse(booleanString);
        } catch (err) {
            throw err;
        }
    },

    updateUser: async (args) => {
        try {
            let user = await User.findById(args._id);
            if (user.type === 0) {
                throw new Error('Not Authorized');
            }
            if (args.update.del) {
                await User.deleteOne({ "_id": args._id });
            } else {
                await User.updateOne({ "_id": args._id }, args.update);
                user = await User.findById(args._id);
            }
            return singleResponse(user);
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = mutationResolver;