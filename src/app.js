const express = require('express');
const morgan = require('morgan');
require('express-async-errors');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes');
const passport = require('./passport/passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = config.port || 3000;

const app = express();

app.use('/uploads', express.static('uploads'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(config.api.prefix, routes());

app.use(cookieParser());

app.use(passport.initialize());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

mongoose.connect(config.databaseURL, {
    useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use((req, res, next) => {
    res.status(404).send('Not found');
})

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).send('Error on server');
})

const server = app.listen(PORT, err => {
    if (err) {
        console.log(err);
        process.exit(1);
        return;
    }
    console.log('App is running at port: ' + PORT);
});