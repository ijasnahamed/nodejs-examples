/*
* Requires rectangle-1.js, now exported functions can be accessable from variable rectangle
*/
var rectangle = require("./rectangle-1");

var solveRectangle = function(l, b) {
	if(l<0 || b<0) {
		console.log("Invalid rectangle");
	} else {
		console.log("Area : "+rectangle.area(l, b));
		console.log("Perimeter : "+rectangle.perimeter(l, b));
	}
}

solveRectangle(2, 3);
solveRectangle(3,4);
solveRectangle(-3,5);