const mongoose = require("mongoose");
require("dotenv").config();
const dburl = process.env.MONGO_URI;

mongoose.connect(dburl)
    .then(() => {
        console.log('Database Connected')
    })
    .catch((err) => {
        console.log(err)
    })