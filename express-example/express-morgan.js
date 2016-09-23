/*
*	Start static website by loading html files
*/
var express = require("express");
var morgan = require("morgan");

var hostname = "localhost";
var port = 3000;

var app = express();

app.use(morgan("dev"));

app.use(express.static(__dirname+"/public")); // html files will be loaded from this file

app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}`);
});

/*
*	http://localhost:3000 :: works
*	http://localhost:3000/about.html :: works
*	http://localhost:3000/home.html :: error
*/