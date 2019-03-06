// server.js
// where your node app starts

// init project
import express from 'express';
import routes from './routes.js';
import mongoose from 'mongoose';
import * as services from './services.js';

var app = express();

mongoose.connect(process.env.MONGO);

let db = mongoose.connection;

db.on("error", console.error.bind(console, "error:"));
db.once("open", function() {

    app.use(routes);
    let listener = app.listen(process.env.PORT, function() {
        console.log("Your run on " + listener.address().port);
    });
});