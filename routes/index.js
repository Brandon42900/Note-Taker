const express = require('express');


const apiRouter = require('./apiRoutes');

const app = express();

app.use('/notes', apiRouter);

module.exports = app;