var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserAccountSchema = new Schema(
    {
        firstName: {type: String, required: true, max: 60},
        lastName: {type: String, required: true, max: 60},
        email: {type: String, required: true, max: 300},
        username: {type: String, required: true, max: 100},
        password: {type: String, required: true, max: 100},
        post: [{
            user: {type: String, max: 100},
            body: {type: String, max: 530},
        }]

    }
);

//Export model
module.exports = mongoose.model('UserAccount', UserAccountSchema);