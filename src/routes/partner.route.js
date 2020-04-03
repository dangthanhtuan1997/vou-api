const express = require('express');
const router = express.Router();
const Voucher = require('../model/voucher.model');
const Partner = require('../model/partner.model');

module.exports = (app) => {
    app.use('/partners', router);

    router.get('/', async (req, res) => {
        var partners = await Partner.find({});
        return res.status(200).json(partners);
    });

    router.get('/:partnerId/voucher', async (req, res) => {
        var partnerId = req.params.partnerId;
        var vouchers = await Voucher.find({ partnerId: partnerId });
        var voucher = vouchers[Math.floor(Math.random() * vouchers.length)];
        return res.status(200).json(voucher);
    });

    router.post('/', (req, res) => {
        Partner.findOne({ username: req.body.username }, (err, p) => {
            if (p) {
                return res.status(401).json({message: 'Partner has already been taken'})
            }
            const partner = new Partner({ ...req.body });

            partner.save((err, partner) => {
                if (err) { return res.status(500).json(err) }
                return res.status(201).json(partner);
            });
        });
    });
};