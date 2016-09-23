/*
*	How to start a node http server
*	global package to start http server
*/
var http = require("http");

var hostname = "localhost";
var port = "3000";

var server = http.createServer(function(req, res){
	console.log(req.headers); // logs request header

	res.writeHead(200, {"Content-Type":"text/html"}); // set response status to 200 and content-type as html
	res.end("<h2>Hello world</h2>"); // ends response with sending html code
});

server.listen(port, hostname, function(){
	console.log('Server started at http://'+hostname+':'+port); // this will be logged when server starts
});