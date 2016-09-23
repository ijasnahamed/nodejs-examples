
var rectangle = require("./rectangle-2");

var solverect = function(l, b) {

	// handle if function return data or an error
	rectangle(l, b, function(err, data){
		if(err) {
			console.log("Error occured "+ err);
		} else {
			console.log("Area : "+data.area());
			console.log("Perimeter : "+data.perimeter());
		}
	});

}

solverect(1, 2);
solverect(-2, 4);