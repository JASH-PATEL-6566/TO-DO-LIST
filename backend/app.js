const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes_list = require('./Routes/routes_list')
const cors = require('cors')
app = express();

mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/TODO-List', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Database connected successFully'))

routes_list(app);

module.exports = app;