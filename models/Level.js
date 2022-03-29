const { Schema, model } = require('mongoose');

const Level = new Schema({
    level: { type: Number, default: 0 },
    typeLevel: {type: String, default: "math"},
    tasks: { type: Array, default: [] },
    answers: { type: Array, default: [] },
});


module.exports = model("levels", Level);