/*
*	yargs - package to capture command line input
*/

var argv = require("yargs")
			.usage("Usage : node $0 -l=[num] -b=[num]")
			.demand(["l", "b"])
			.argv;
/*
*	execute this script in below format
*	node command-line -l=10 -b=5
*/

var rectangle = require("./rectangle-2");

var solverect = function(l, b) {
	rectangle(l, b, function(err, data){
		if(err) {
			console.log("Error occured "+ err);
		} else {
			console.log("Area : "+data.area());
			console.log("Perimeter : "+data.perimeter());
		}
	});
}

/*
*	argv.l will be -l command line value
*	argv.b will be -b command line value
*/

solverect(argv.l, argv.b);