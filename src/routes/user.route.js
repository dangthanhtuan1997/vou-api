const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('../passport/passport');
const User = require('../model/user.model');
const config = require('../config');
const verify = require('../middlewares/auth.middleware');

module.exports = (app) => {
    app.use('/users', router);

    router.get('/me', verify, async (req, res) => {
        const user = await User.findById(req.tokenPayload.userId);
        return res.status(200).json(user);
    });

    router.patch('/me', verify, (req, res) => {
        let UpdateUser = {
            $set: {
                display_name: req.body.display_name,
                email: req.body.email,
                date_of_birth: req.body.date_of_birth,
                gender: req.body.gender
            }
        };
        
        User.findByIdAndUpdate(req.tokenPayload.userId, UpdateUser, (err, user) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!user) {
                return res.status(404).json({ message: 'Not found user: ' + req.tokenPayload.userId });
            }
            res.status(200).json({ message: 'Update successful' });
        });
    });
};