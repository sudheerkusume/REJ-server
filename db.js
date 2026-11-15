const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    // Ignore if not supported in environment
}

const dburl = process.env.MONGO_URI;

mongoose.connect(dburl)
    .then(() => {
        console.log('Database Connected')
    })
    .catch((err) => {
        console.log(err)
    })
