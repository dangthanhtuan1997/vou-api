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
        if (req.body.newPassword.length < 6) {
            return res.status(401).json({ message: 'Passwords must be at least 6 characters' });
        }

        bcrypt.hash(req.body.newPassword, config.saltRounds, (err, hash) => {
            let UpdateUser = {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    dateOfBirth: req.body.dateOfBirth,
                    gender: req.body.gender,
                    password: hash
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
    });
};