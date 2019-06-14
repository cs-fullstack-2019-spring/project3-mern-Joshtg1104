var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserAccountSchema = new Schema(
    {
        firstName: {type: String, required: true, max: 60},
        lastName: {type: String, required: true, max: 60},
        email: {type: String, required: true, max: 300},
        username: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        image: {type: String, max: 1000},
        post: [{type: String, max: 530}],
        date: {type: Date}
    }
);

//Export model
module.exports = mongoose.model('UserAccount', UserAccountSchema);