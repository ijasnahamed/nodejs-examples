/*
*	Basic node js example
*	Function to get permieter and area of a rectangle with length and breadth as example
*/

// rectangle object having perimeter and area as parameters

var rectangle = {
	perimeter: function(x, y) {
		return 2*(x+y);
	},
	area: function(x, y) {
		return x*y;
	}
};

// function to calculate perimeter and area of a rectangle with length and breadth as params

var solveRectangle = function(l, b) {
	if(l<0 || b<0) {
		console.log("Invalid Rectangle");
	} else {
		console.log("Area : "+rectangle.area(l, b));
		console.log("Perimeter : "+rectangle.perimeter(l, b));
	}
}

solveRectangle(2, 3);
solveRectangle(3,4);
solveRectangle(-3,5);