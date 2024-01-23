const express = require('express');

// const cookie = require('cookie-parser');
const { auth } = require('../middlewares/authMiddlewares');

function expressConfig(app) {
    app.use(express.urlencoded({ extended: false }));
    app.use( express.json());
    app.use(auth);
    // app.use(cookie());

}

module.exports = expressConfig;

