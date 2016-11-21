var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-1');

var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);
var db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));

db.once("open", function() {
	console.log("Connected to server");

	Dishes.create({
		name: "name-2",
		description: "desc-2"
	}, function(err, dish){
		if(err) throw err;

		console.log("Dish created");
		console.log(dish);
		var id = dish._id;

		setTimeout(function(){
			Dishes.findByIdAndUpdate(id, {
				$set: {
					description: "desc-2-updated"
				}
			}, {
				new: true
			})
			.exec(function(err, dish) {
				if(err) throw err;

				console.log("Dish updated");
				console.log(dish);

				db.collection("dishes").drop(function(){
					db.close();
				})

			});
		}, 3000);

	});
});