/*
*	Basic example of exporting functions as module so that these functions can be accessable from other scripts
*/

exports.perimeter = function(x, y) {
	return 2*(x+y);
}

exports.area = function(x, y) {
	return x*y;
}