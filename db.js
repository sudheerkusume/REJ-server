const mongoose = require("mongoose");
const dburl = 'mongodb+srv://rockycreta_db_user:Sudheer123@rej.uxyl2gk.mongodb.net/?appName=REJ';

mongoose.connect(dburl)
    .then(() => {
        console.log('Database Connected')
    })
    .catch((err) => {
        console.log(err)
    })