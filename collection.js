const { MongoClient } = require('mongodb');

const url = "mongodb://localhost:27017/";

MongoClient.connect(url)
    .then((conn) => {
        const db = conn.db('realestate')
        db.createCollection('jobCategories')
            .then(() => {
                console.log('Collection created successfully')
            })
            .catch((err) => {
                console.error('error creating collection', err)
            })
            .finally(() => {
                conn.close();
            })
    })
    .catch((err) => {
        console.log(err);
    }) 