const express = require('express');
const router = express.Router();
const Voucher = require('../model/voucher.model');

module.exports = (app) => {
    app.use('/partners', router);

    router.get('/', async (req, res) => {
        var partners = await Partner.find({});
        return res.status(200).json(partners);
    });

    router.get('/:partnerId/vouchers', async (req, res) => {
        var partnerId = req.params.partnerId;
        var vouchers = await Voucher.find({partnerId: partnerId});
        return res.status(200).json(vouchers);
    });

    router.post('/', (req, res) => {
        const {username} = req.body;
        
        Partner.findOne({ username: username }, (err, p) => {
            if (p) {
                return res.status(401).json({ message: 'Username has already been taken' })
            }
            const partner = new Partner({ ...req.body });

            partner.save((err, partner) => {
                if (err) { return res.status(500).json(err) }
                return res.status(201).json(partner);
            });
        });
    });
};