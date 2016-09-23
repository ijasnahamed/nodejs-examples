/*
*	How to return html files as http response
*	http package to start http server
*	fs package to read files
*	path package to get path details of files
*/

var http = require("http");
var fs = require("fs");
var path = require("path");

var hostname = "localhost";
var port = "3000";

var server = http.createServer(function(req, res){

	console.log(req.headers); // request headers
	console.log("Url : "+req.url); // request url
	console.log("Method : "+req.method); // request method

	if(req.method=="GET") {

		var fileUrl = "";

		if(req.url=="/")
			fileUrl = "/index.html";
		else
			fileUrl = req.url;

		var filePath = path.resolve("./public"+fileUrl); // construct complete path to output file
		var fileExt = path.extname(filePath); // get file extension

		if(fileExt==".html") {

			fs.exists(filePath, function(exists){ // check if file exists

				if(!exists) {
					res.writeHead(404, {"Content-Type":"text/html"});
					res.end("Error : Page Not found");
					return;
				}

				res.writeHead(200, {"Content-Type":"text/html"});
				fs.createReadStream(filePath).pipe(res); // read file and output to as response

			});

		} else {
			res.writeHead(404, {"Content-Type":"text/html"});
			res.end("Error : Page Not found");
		}

	} else {
		res.writeHead(404, {"Content-Type":"text/html"});
		res.end("Error : Page Not found");
	}

});

server.listen(port, hostname, function(){
	console.log('Server started at http://'+hostname+':'+port); // this will be logged when server starts
});