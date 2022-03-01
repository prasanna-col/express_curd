
var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var constants = require('./constants.js');
router.post('/', (request, response) => {
    console.log(request.body);
    // MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
    MongoClient.connect(constants.url, async function (err, db) {
        if (err) throw err;
        var dbmy = db.db('flutterapp_db1')
        var collectionName = "customer"
        var data = request.body
        console.log("data", data);
        var collection = dbmy.collection(collectionName);
        var where_data = { email: data.email };
        var newvalues = { $set: { name: data.name, phone: data.phone } };
        collection.findOne({ email: data.email }, function (err, res) {
            if (err) {
                console.log("Failed");
                response.json({
                    message: "failed",
                    response: null
                });
                db.close();
            } else {
                if (res != null) {
                    collection.update(where_data, newvalues, function (err, res) {
                        console.log("res", res)
                        if (err) {
                            console.log("Failed");
                            response.json({
                                message: "failed",
                                response: null
                            });
                            db.close();
                        } else {
                            response.json({
                                message: "updated successfully",
                                response: []
                            });
                            db.close();
                        }
                    });
                } else {
                    response.json({
                        message: "update not successful",
                        response: null
                    });
                }
            }
        });


    })
});

module.exports = router;