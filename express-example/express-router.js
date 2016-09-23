/*
*	Start a node server using express router
*/
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");

var hostname = "localhost";
var port = 3000;

var app = express();

app.use(morgan("dev"));

var router = express.Router();

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.route("/")
.all(function(req, res, next){
	res.writeHead(200, {"Content-Type":"text/plain"});
	next();
})

.get(function(req, res, next){
	res.end("All dishes will be listed");
})

.post(function(req, res, next){
	res.end("New dish will be created with name "+req.body.name+" and desc "+req.body.description);
})

.delete(function(req, res, next){
	res.end("Delete all dishes");
})

router.route("/:dishId")
.all(function(req, res, next){
	res.writeHead(200, {"Content-Type":"text/plain"});
	next();
})
.get(function(req, res, next){
	res.end("Dish with id "+req.params.dishId+" will be listed");
})

.put(function(req, res, next){
	res.end("dish with dish id "+req.params.dishId+" will be updated with name "+req.body.name+" and desc "+req.body.description);
})

.delete(function(req, res, next){
	res.end("dish with id "+req.params.dishId+" will be deleted");
});

app.use("/dishes", router); // assign router method for request having url in /dishes format

app.use(express.static(__dirname+"/public"));

app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}`);
})