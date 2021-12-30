const mongoose = require('mongoose');

const booleanStringSchema = new mongoose.Schema({
    position: { type: String, required: true },
    skill: { type: String, required: true },
    location: { type: String, required: true },
    booleanString: { type: String, required: true },
    slag: { type: String, required: true },
    state: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('BooleanString', booleanStringSchema);