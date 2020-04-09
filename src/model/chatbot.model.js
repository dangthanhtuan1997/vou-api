const mongoose = require('mongoose');

var ChatBotSchema = new mongoose.Schema(
    {
        name: String,
        phone: String,
        data: String
    },
    {
        timestamps: true
    }
);

var chatbots = mongoose.model('chatbots', ChatBotSchema);

module.exports = chatbots;