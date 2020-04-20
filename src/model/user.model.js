const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        display_name: String,
        email: String,
        date_of_birth: String,
        gender: String,
        facebook_id: String,
        google_id: String,
        vouchers: [Schema.Types.ObjectId],
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