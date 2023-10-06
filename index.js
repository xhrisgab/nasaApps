const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');

const config = require('./config/config');
const router = require('./network/routes');

app.use(express.json())
app.use(express.urlencoded({extended: true}));


/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./network/routes.js
router(app);

/**
 * -------------- SERVER ----------------
 */
// Server listens on http://localhost:3000 (dependes .env file)
server.listen(config.portApp, function() {
    console.log("server listening on "+ config.hostApp +":"+config.portApp);
});