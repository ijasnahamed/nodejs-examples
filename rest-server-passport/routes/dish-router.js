/*
*	Create a module for dishes http request handler
*/
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');

var Dishes = require("../models/dishes-3");
var Verify = require('./verify');

var dishRouter = express.Router();

dishRouter.use(bodyParser.urlencoded({
    extended: true
}));
dishRouter.use(bodyParser.json());

dishRouter.route("/")
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.find({})
		.populate('comments.postedBy')
		.exec(function(err, dish) {
		if(err) throw err;
		res.json(dish);
	});
})
.post(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.create(req.body, function(err, dish) {
		if(err) throw err;

		console.log("Dish created");
		var id = dish._id;
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end("Dish created with id "+id);
	});
})
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.remove({}, function(err, resp){
		if(err) throw err;
		res.json(resp);
	});
});

dishRouter.route("/:dishId")
.get(Verify.verifyOrdinaryUser, function(req, res, next){
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dish) {
		if(err) throw err;
		res.json(dish);
	});
})
.put(function(req, res, next){
	Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new:true}, function(err, dish) {
		if(err) throw err;
		res.json(dish);
	});
})
.delete(function(req, res, next){
	Dishes.remove(req.params.dishId, function(err, resp){
		if(err) throw err;
		res.json(resp);
	});
});

dishRouter.route("/:dishId/comments")
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dish) {
		if(err) throw err;
		res.json(dish.comments);

	});
})
.post(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish) {
		if(err) throw err;

		req.body.postedBy = req.decoded._doc._id;

		dish.comments.push(req.body);
		dish.save(function(err, dish) {
			console.log("Comment updated");
			console.log(dish);

			res.json(dish);
		});
	});
})
.delete(Verify.verifyAdmin, function(req, res, next){
	Dishes.findById(res.params.dishId, function(err, dish) {
		if(err) throw err;

		for(var i=(dish.comments.length - 1); i>=0; i++) {
			dish.comments.id(dish.comments[i]._id).remove();
		}

		dish.save(function(err, resp) {
			if(err) throw err;

			console.log("Deleted all");
			res.writeHead(200, {'Content-Type':'text/plain'});
			res.end("Deleted al comments");
		});
	})
});

dishRouter.route("/:dishId/comments/:commentId")
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
	Dishes.findById(req.params.dishId)
		.populate('comments.postedBy')
		.exec(function(err, dish) {
		if(err) throw err;
		res.json(dish.comments.id(req.params.commentId));
	});
})
.put(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish) {
		if(err) throw err;

		dish.comments.id(req.params.commentId).remove();

		req.body.postedBy = req.decoded._doc._id;

		dish.comments.push(req.body);

		dish.save(function(err, dish) {
			if(err) throw err;

			res.json(dish); 
		});
	});
})
.delete(function(req, res, next){
	Dishes.findById(req.params.dishId, function(err, dish) {
		if(err) throw err;

		if(dish.comments.id(req.params.commentId).postedBy!=req.decoded._doc._id)
		{
			var err = new Error('You are not authorised to perform this operation');
			err.status = 403;
			return next(err);
		}

		dish.comments.id(req.params.commentId).remove();

		dish.save(function(err, dish) {
			if(err) throw err;

			res.json(dish); 
		});
	});
});

module.exports = dishRouter;