const express = require('express');
const router = express.Router();
const CodeGenerator = require('node-code-generator');
const QRCode = require('qrcode');
const Voucher = require('../model/voucher.model');

module.exports = (app) => {
    app.use('/vouchers', router);

    router.get('/:id', async (req, res) => {
        var partners = await Voucher.find({ _id: id });
        return res.status(200).json(partners);
    });

    router.post('/', (req, res) => {
        Voucher.findOne({ code: req.body.code }, async (err, v) => {
            if (v) {
                return res.status(401).json({ message: 'Voucher has already been taken' })
            }
            var generator = new CodeGenerator();
            var codes = generator.generateCodes('**********', 10, {});

            const qr_code = await QRCode.toDataURL(codes[0]);
            const voucher = new Voucher({ ...req.body, qr_code });

            voucher.save((err, voucher) => {
                if (err) { return res.status(500).json(err) }
                return res.status(201).json(voucher);
            });
        });
    });
};