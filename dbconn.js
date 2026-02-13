const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017/realestate";


MongoClient.connect(url)
    .then((conn) => {
        console.log('Database Connected');
        conn.close();
    })
    .catch((err) => {
        console.log('unable to connect db');
        console.log(err);
    })