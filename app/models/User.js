var AppModel = require('./AppModel');
var util = require('util');

/**
 * model User extends AppModel
 */
function User(){ util.inherits(User, AppModel);

	/**
	 * find data using querystring params
	 * @return {array}
	 */
	this.find = function(cb){

	};

}

module.exports = new User();
