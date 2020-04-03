const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VoucherSchema = new mongoose.Schema(
    {
        partnerId: Schema.Types.ObjectId,
        discount: Number,
        code: String,
        qr_code: String,
        description: String,
        startTime: Date,
        endTime: Date
    },
    {
        timestamps: true
    }
);

var vouchers = mongoose.model('vouchers', VoucherSchema);

module.exports = vouchers;