var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://Flutter_data:flutterapidata@cluster0.5kghi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var constants = require('./constants.js');
var autoIncrement = require("mongodb-autoincrement");
//Here we are configuring express to use body-parser as middle-ware.


router.post('/', (request, response) => {
    
    MongoClient.connect(constants.url, async function (err, db) {
        if (err){
            response.json({
                message: "err",
                response: err
            });
            throw err;
        }  
        var dbmy = db.db('flutterapp_db1')
        var collectionName = "customer"
        console.log("request", request)
        var data = request.body
        console.log("data", data);


        var collection = dbmy.collection(collectionName);
        collection.findOne({ email: data.email, password: data.password }, function (err, res) {
            console.log("res", res)
            if (err) {
                console.log("Failed");
                response.json({
                    message: "failed",
                    response: null
                });
                db.close();
            } else {
                if(res != null){
                    response.json({
                        message: "Login successful",
                        response: res
                    });
                }else{
                    response.json({
                        message: "User not available",
                        response: null
                    });
                }
                
                db.close();
            }
        });

    })

});

module.exports = router;
