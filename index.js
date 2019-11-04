'use strict';
const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbURL = 'mongodb://mongodb';
const dbName = 'mongoclientlearn';
const app = express();

const insertDocuments = function(callback) {
    MongoClient.connect(dbURL, function(err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	// Get the documents collection
	const collection = db.collection('documents');
	// Insert some documents
	collection.insertMany([{a : 1}, {a : 2}, {a : 3}], 
			      function(err, result) {
				  assert.equal(err, null);
				  assert.equal(3, result.result.n);
				  assert.equal(3, result.ops.length);
				  console.log("Inserted 3 documents into the collection");
				  callback(result);
			      });
    });
}

const findDocuments = function(callback) {
    MongoClient.connect(dbURL, function(err, client) {
	assert.equal(null, err);
	console.log("Connected successfully to server");
	const db = client.db(dbName);
	// Get the documents collection
	const collection = db.collection('documents');
	// Find some documents
	collection.find({}).toArray(function(err, docs) {
	    assert.equal(err, null);
	    console.log("Found the following records");
	    console.log(docs)
	    callback(docs);
	});
    });
}

// Cannot access 'findDocuments' before initialization.
// must declare before using.
app.get('/listall',function(request, response){
    // response.json({
    //     'ret':0,
    //     'message':'Hello World!'
    // })
    findDocuments(function (res) {
	response.json(res)
    });
});


const port=5004
app.listen(port, () => {
  console.log(`app started on port ${port}`);
})
