const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PartnerSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        displayName: String,
        address: String,
        email: String,
        voucher: [Schema.Types.ObjectId],
        game: [Schema.Types.ObjectId],
        image: {
            type: String,
            default: '/uploads/default_avatar.png'
        },
        role: { type: String, default: 'partner' }
    },
    {
        timestamps: true
    }
);

var partners = mongoose.model('partners', PartnerSchema);

module.exports = partners;