const BooleanString = require('../../models/booleanString');
const { singleResponse, multiResponse } = require('../../helper/response');

const stringResolver = {

    booleanString: async (args) => {
        console.log(args);
        try {
            const booleanString = await BooleanString.find(args);
            return multiResponse(booleanString);
        } catch (err) {
            throw err;
        }
    },

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

    updateBooleanString: async (args) => {
        try {
            let booleanString = await BooleanString.findById(args.id);
            if (args.update.del) {
                await BooleanString.deleteOne({ "_id": args.id });
            } else {
                await BooleanString.updateOne({ "_id": args.id }, args.update);
                booleanString = await BooleanString.findById(args.id);
            }
            return singleResponse(booleanString);
        } catch (err) {
            throw err;
        }
    }

}

module.exports = stringResolver;