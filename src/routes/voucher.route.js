const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');
const CodeGenerator = require('node-code-generator');
const QRCode = require('qrcode');
const Voucher = require('../model/voucher.model');
const Partner = require('../model/partner.model');
const verify = require('../middlewares/auth.middleware');

module.exports = (app) => {
    app.use('/vouchers', router);

    router.get('/:id', verify, async (req, res) => {
        var voucher = await Voucher.findById(req.params.id);
        var partner = await Partner.findById(voucher.partner_id);
        return res.status(200).json({ voucher, partner });
    });

    router.post('/', verify, async (req, res) => {
        for (let i = 0; i < req.body.count; i++) {
            const generator = new CodeGenerator();
            const code = req.body.promo_code + generator.generateCodes('**********', 10, {})[0];

            const qr_code = await QRCode.toDataURL(code);

            await Voucher.findOne({ code: code }, (err, v) => {
                if (v) {
                    i--;
                }
                else {
                    const voucher = new Voucher({ ...req.body, qr_code, code });

                    voucher.save((err, voucher) => {
                        if (err) { 
                            i--;
                        }
                    });
                }
            });
        }
        return res.status(201).json({message: "Create successful"});
    });
};