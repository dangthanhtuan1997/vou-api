const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VoucherSchema = new mongoose.Schema(
    {
        partnerId: Schema.Types.ObjectId,
        discount: Number,
        code: String,
        qr_code: String,
        type: String,
        userId: { type: Schema.Types.ObjectId, default: null },
        used: { type: Boolean, default: false },
        owned: { type: Boolean, default: false },
        description: String,
        maximumValue: { type: Number, default: null },
        startTime: Date,
        endTime: Date
    },
    {
        timestamps: true
    }
);

var vouchers = mongoose.model('vouchers', VoucherSchema);

module.exports = vouchers;