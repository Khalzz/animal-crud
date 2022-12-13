const mongoose = require('mongoose');

const Animal = mongoose.model('Animal', {
    name: {type: String, required: true, minLength: 3},
    state: {type: String, required: true, minLength: 3},
});

module.exports = Animal;