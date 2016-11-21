var mongoose = require('mongoose');
var assert = require('assert');

var Dishes = require('./models/dishes-3');

var url = "mongodb://localhost:27017/conFusion";
mongoose.connect(url);
var db = mongoose.connection;

db.on("error", console.error.bind(console, 'connection error:'));

db.once("open", function() {
	console.log("Connected to server");

	Dishes.create({
		name: "name-5",
		description: "desc-5",
		comments: [{
			rating: 5,
			comment: "This is insane",
			author: "Matt Deamon"
		}]
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

				dish.comments.push({
					rating: 3,
					comment: "I am getting a sinking feeling",
					author: "Leonardo Dicaprio"
				});

				dish.save(function(err, dish) {
					console.log("Comment updated");
					console.log(dish);

					db.collection("dishes").drop(function(){
						db.close();
					});
				});

			});
		}, 3000);

	});
});