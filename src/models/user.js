const mongoose = require('mongoose');

const User = mongoose.model('User', {
    username: {type: String, required: true, minLength: 3},
    password: {type: String, required: true, minLength: 6},
    salt: {type: String, required: true},
});

module.exports = User;