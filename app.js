const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydb');
mongoose.connection.on('connected', () => {
    console.log('connected to mongodb');
})
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error' + err);
    }
});

var routes = require('./route');
routes(app);

app.use(function (err, req, res, next) {
    res.status(500).send(err.message);
})

app.listen(3000, () => {
    console.log('Server started on port: ' + 3000);
});
