const { Schema, model } = require('mongoose');

const User = new Schema({
    name: {type: String, default: 'Guest' },
    login: {type: String, require: true},
    password: {type: String, require: true},
    level: {type: Number, default: 0},
});


module.exports = model("users", User);