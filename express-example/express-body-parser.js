/*
*	Start a node server and parse the request using body-parser module
*/
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");

var hostname = "localhost";
var port = 3000;

var app = express();

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.all("/dishes", function(req, res, next){ // this function will be executed for all requests of type /dishes/*
	res.writeHead(200, {"Content-Type":"text/plain"});
	next();
});

app.get("/dishes", function(req, res, next){
	res.end("All dishes will be listed");
});

app.post("/dishes", function(req, res, next){
	console.log(JSON.stringify(req.query));
	res.end("New dish will be created with name "+req.body.name+" and desc "+req.body.description);
});

app.delete("/dishes", function(req, res, next){
	res.end("Delete all dishes");
});

app.get("/dishes/:dishId", function(req, res, next){
	res.end("Dish with id "+req.params.dishId+" will be listed");
});

app.put("/dishes/:dishId", function(req, res, next){
	res.end("dish with dish id "+req.params.dishId+" will be updated with name "+req.body.name+" and desc "+req.body.description);
});

app.delete("/dishes/:dishId", function(req, res, next){
	res.end("dish with id "+req.params.dishId+" will be deleted");
});

app.use(express.static(__dirname+"/public")); // load static website

app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}`);
})