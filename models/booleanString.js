const mongoose = require('mongoose');

const booleanStringSchema = new mongoose.Schema({
    booleanString: { type: String, required: true, unique: true },
    field: { type: [String], required: true },
    state: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('BooleanString', booleanStringSchema);