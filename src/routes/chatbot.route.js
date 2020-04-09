const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');
const Voucher = require('../model/voucher.model');
const Partner = require('../model/partner.model');
const User = require('../model/user.model');
const axios = require('axios');

module.exports = (app) => {
    app.use('/chatbot', router);

    router.post('/', async (req, res) => {
        const {fullName, phone} = req.body;
        console.log(fullName, phone);
        return res.status(200).json();
    });
};