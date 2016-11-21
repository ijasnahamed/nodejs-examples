var MongoClient = require("mongodb").MongoClient,
	assert = require("assert");

/*
*	Connecting to conFusion database
*/

var url = "mongodb://localhost:27017/conFusion";

MongoClient.connect(url, function(err, db){
	assert.equal(err, null);
	console.log("Connected to server");

	var collection = db.collection("dishes");

	collection.insert({name:"New Dish", desc:"Dish Description"}, function(err, result){ // inserting new entry
		assert.equal(err, null);
		console.log("Inserted");
		console.log("Id : "+JSON.stringify(result.ops));

		collection.find({}).toArray(function(err, docs){ // listing all entries
			assert.equal(err, null);
			console.log("Data:");
			console.log(docs);

			db.dropCollection("dishes", function(err, result){ // deleting a collection(all entries)
				assert.equal(err, null);
				console.log("Dropped");
				db.close();
			});
		});
	});
});