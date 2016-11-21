var MongoClient = require("mongodb").MongoClient,
	assert = require("assert"),
	dboper = require("./operations");

var url = "mongodb://localhost:27017/conFusion";

MongoClient.connect(url, function(err, db){
	assert.equal(err, null);
	console.log("Connected to server");

	dboper.insertDocument(db, {name:"New Dish", desc:"New Dish description"}, "dishes", function(result){
		console.log("Insert res");
		console.log(result.ops);

		dboper.findDocument(db, "dishes", function(result){
			console.log(result);

			dboper.updateDocument(db, {name:"New Dish"}, {desc:"Updated New Dish Description"}, "dishes", function(result){
				console.log(result.result);

				dboper.findDocument(db, "dishes", function(result){
					console.log(result);

					db.dropCollection("dishes", function(result){
						console.log(result);
						db.close();
					});
				});
			});
		});
	});

});