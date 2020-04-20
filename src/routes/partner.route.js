const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');
const Voucher = require('../model/voucher.model');
const Partner = require('../model/partner.model');
const User = require('../model/user.model');
const verify = require('../middlewares/auth.middleware');

module.exports = (app) => {
    app.use('/partners', router);

    router.get('/', verify, async (req, res) => {
        var partners = await Partner.find({});
        return res.status(200).json(partners);
    });

    router.post('/:partnerId/voucher', verify, async (req, res) => {
        const { partnerId } = req.params;
        const { userId } = req.body;

        try {
            const vouchers = await Voucher.find({ partnerId: partnerId, owned: false });
            const voucherRandom = vouchers[Math.floor(Math.random() * vouchers.length)];
            if (!voucherRandom) {
                return res.status(204).end();
            }
            const voucher = { ...voucherRandom.toObject(), userId: userId, owned: true };
            await Voucher.findByIdAndUpdate(voucher._id, voucher);
            await User.findByIdAndUpdate(userId, {$push: {voucher: voucher._id}})
            return res.status(200).json(voucher);
        } catch (error) {
            console.log(error);
        }
    });

    router.post('/', verify, (req, res) => {
        Partner.findOne({ username: req.body.username }, (err, p) => {
            if (p) {
                return res.status(401).json({ message: 'Partner has already been taken' })
            }
            const partner = new Partner({ ...req.body });

            partner.save((err, partner) => {
                if (err) { return res.status(500).json(err) }
                return res.status(201).json(partner);
            });
        });
    });
};