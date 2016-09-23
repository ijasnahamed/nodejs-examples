/*
*	Import express router from another package
*/
var express = require("express");
var morgan = require("morgan");
var urlRouter = require("./url-handler");

var hostname = "localhost";
var port = 3000;

var app = express();

app.use(morgan("dev"));

app.use("/dishes", urlRouter.router);

app.use(express.static(__dirname+"/public"));

app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}`);
});