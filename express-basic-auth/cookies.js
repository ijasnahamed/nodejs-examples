/*
*	Start static website by loading html files
*/
var express = require("express");
var morgan = require("morgan");
var cookieParser = require("cookie-parser");

var hostname = "localhost";
var port = 3000;

var app = express();

app.use(morgan("dev"));
app.use(cookieParser("12345-67890-09876-54321"));

function auth(req, res, next) {
	console.log(req.headers);

	if(!req.signedCookies.user) {
		var authHeader = req.headers.authorization;

		if(!authHeader) {
			var err = new Error('You are not authorized');
			err.status = 401;
			next(err);
			return;
		}

		var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(":");
		var user = auth[0];
		var pass = auth[1];

		if(user=="admin" && pass=="password") {
			res.cookie('user', 'admin', {signed: true});
			next();
		} else {
			var err = new Error('You are not authorized');
			err.status = 401;
			next(err);
		}
	} else {
		if(req.signedCookies.user=='admin') {
			console.log(req.signedCookies);
			next();
		} else {
			var err = new Error('You are not authorized');
			err.status = 401;
			next(err);
		}
	}
		
}

app.use(auth);

app.use(express.static(__dirname+"/public")); // html files will be loaded from this file

app.use(function(err, req, res, next) {
	res.writeHead(err.status || 500, {
		'WWW-Authenticate': 'Basic',
		'Content-Type': 'text/plain'
	});
	res.end(err.message);
});

app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}`);
});

/*
*	http://localhost:3000 :: works
*	http://localhost:3000/about.html :: works
*	http://localhost:3000/home.html :: error
*/