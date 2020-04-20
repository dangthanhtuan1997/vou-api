const express = require('express');
const router = express.Router();

const user = require('./user.route');
const auth = require('./auth.route');
const upload = require('./upload.route');
const partner = require('./partner.route');
const voucher = require('./voucher.route');

module.exports = () => {
    user(router);
    auth(router);
    upload(router);
    partner(router);
    voucher(router);
    
    return router;
}