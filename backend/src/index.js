const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const movieRouter = require('./routes/router.js');
const CONNECTION_URL = require('../config.js');
const cors = require('cors');

app.use(bodyparser.json({ limit: "15mb", extended: true}));
app.use(bodyparser.urlencoded({limit: "15mb", extended: true}));
app.use(cors());

app.use('/movies', movieRouter);

const PORT = process.env.PORT || 3001;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);