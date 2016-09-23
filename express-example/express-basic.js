/*
*	Handle http request using express
*/
var express = require("express");
var http = require("http");

var hostname = "localhost";
var port = 3000;

var app = express();

app.use(function(req, res, next){
	console.log("req : "+req.url);

	res.writeHead(200, {"Content-Type":"text/html"});
	res.end("<h1>Hello world</h1>");
});

var server = http.createServer(app);

server.listen(port, hostname, function(){
	console.log('Server started at http://${hostname}:{$port}');
});