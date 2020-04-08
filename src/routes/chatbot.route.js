const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');
const Voucher = require('../model/voucher.model');
const Partner = require('../model/partner.model');
const User = require('../model/user.model');

module.exports = (app) => {
    app.use('/chatbot', router);

    router.post('/', async (req, res) => {
        console.log(req.body);
        return res.status(200).json(req.body);
    });
};