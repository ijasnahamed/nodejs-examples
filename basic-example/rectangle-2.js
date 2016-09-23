/*
*	Returning exported functions in callback variable
*/

module.exports = function(x, y, callback) {
	try {
		if(x<0 || y<0) {
			throw new Error("Invalid rectange params"); // throw error in a wrong condition
		} else {
			callback(null, {
				perimeter : function() {
					return 2*(x+y);
				},
				area : function() {
					return x*y;
				}
			});
		}
	} catch(error) {
		callback(error, null);
	}
}