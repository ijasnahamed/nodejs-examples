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

solverect(2, 3);
solverect(3,4);
solverect(-3,5);