var express = require('express')
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//-----------------------------------------------
const url = 'mongodb://localhost:27017';
const dbName = 'sd-l1';

router.get('/', (req, res) => {
    console.log(req.body)
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        if (err) {
            res.status(404).json({ message: "No se encuentran registros" })
        } else {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            findDocuments(db, function (documents) {
                res.send(documents);
                client.close();
            });
        }
    });
    //res.send('En construccion');
})

router.post('/', (req, res) => {
    MongoClient.connect(url, function (err, client) {
        console.log('Insertando en base de datos ',  req.body)
        assert.equal(null, err);
        if (err) {
            res.status(500).json({ message: "Error al insertar datos" })
        } else {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            insertDocuments(db, req.body, function () {
                client.close();
            });
            res.send('En construccion');
        }
    });

})

const insertDocuments = function (db, document, callback) {
    // Get the documents collection
    const collection = db.collection('logs');
    // Insert some documents
    collection.insertOne(document, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        console.log("Inserted 1 document into the collection");
        callback(result);
    });
}

const findDocuments = function (db, callback) {
    const collection = db.collection('logs');
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

module.exports = router;


