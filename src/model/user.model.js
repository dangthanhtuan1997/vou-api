const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        name: String,
        email: String,
        dateOfBirth: String,
        gender: String,
        facebookId: String,
        googleId: String,
        voucher: [Schema.Types.ObjectId],
        avatar: {
            type: String,
            default: '/uploads/default_avatar.png'
        },
        role: { type: String, default: 'user' }
    },
    {
        timestamps: true
    }
);

var users = mongoose.model('users', UserSchema);

module.exports = users;