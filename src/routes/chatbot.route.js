const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');
const ChatBot = require('../model/chatbot.model');

const axios = require('axios');

module.exports = (app) => {
    app.use('/chatbot', router);

    router.post('/', async (req, res) => {
        const { fullName, phone } = req.body;
        
        const response = await axios.post('https://service-api.accesstrade.vn/api/v1/lead/store?campaign_id=61&ad_space_code=ADS000010668&token=ba441b0c86bb92c9ed98bd298c8c2827', {
            name: fullName,
            phone: phone
        });
        console.log(response.data);
        const chatbot = new ChatBot({ name: fullName, phone: phone, data: JSON.stringify(response.data) });
        await chatbot.save();
        return res.status(200).end();
    });
};