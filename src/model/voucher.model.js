const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VoucherSchema = new mongoose.Schema(
    {
        partner_id: Schema.Types.ObjectId,
        discount: Number,
        code: String,
        qr_code: String,
        user_id: { type: Schema.Types.ObjectId, default: null },
        used: { type: Boolean, default: false },
        available: { type: Boolean, default: true },
        description: String,
        maximum_value: { type: Number, default: null },
        start_time: Date,
        end_time: Date
    },
    {
        timestamps: true
    }
);

var vouchers = mongoose.model('vouchers', VoucherSchema);

module.exports = vouchers;