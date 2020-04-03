const express = require('express');
const router = express.Router();
const CodeGenerator = require('node-code-generator');
const QRCode = require('qrcode');
const Voucher = require('../model/voucher.model');

module.exports = (app) => {
    app.use('/vouchers', router);

    router.get('/:id', async (req, res) => {
        var voucher = await Voucher.find({ _id: req.params.id });
        return res.status(200).json(voucher);
    });

    router.post('/', (req, res) => {
        Voucher.findOne({ code: req.body.code }, async (err, v) => {
            if (v) {
                return res.status(401).json({ message: 'Voucher has already been taken' })
            }
            var generator = new CodeGenerator();
            var code = generator.generateCodes('**********', 10, {})[0];

            const qr_code = await QRCode.toDataURL(code);
            const voucher = new Voucher({ ...req.body, qr_code, code });

            voucher.save((err, voucher) => {
                if (err) { return res.status(500).json(err) }
                return res.status(201).json(voucher);
            });
        });
    });
};