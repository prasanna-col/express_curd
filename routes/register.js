// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var autoIncrement = require("mongodb-autoincrement");
//Here we are configuring express to use body-parser as middle-ware.

var constants = require('./constants.js');
router.post('/', (request, response) => {
    console.log(request.body);
    MongoClient.connect(constants.url, async function (err, db) {
        if (err) throw err;
        var dbmy = db.db('flutterapp_db1')
        var collectionName = "customer"
        var data = request.body
        var collection = dbmy.collection(collectionName);

        collection.findOne({ email: data.email }, function (err, res) {
            console.log("res", res)
            if (err) {
                console.log("Failed");
                response.json({
                    message: "failed",
                    response: null
                });
                db.close();
            } else {
                if (res == null) {
                    autoIncrement.getNextSequence(dbmy, collectionName, function (err, autoIndex) {
                        let newObj = { ...data, user_id: String(autoIndex) };
                        console.log("newObj", newObj)
                        collection.insertOne(newObj, function (err, res) {
                            if (err) {
                                console.log("Failed");
                                response.json({
                                    message: "failed",
                                    response: null
                                });
                                db.close();
                            } else {
                                console.log("1 document updated");
                                response.json({
                                    message: "Registered successfully",
                                    response: newObj
                                });
                                db.close();
                            }
                        });

                    });
                } else {
                    response.json({
                        message: "Email already exist",
                        response: null
                    });
                    db.close();
                }

            }
        });


    })
    // response.json({data:request.body})

    //code to perform particular action.
    //To access POST variable use req.body()methods.

});

module.exports = router;