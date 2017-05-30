/**
 * Main Controller all controllers extends this one
 */
function AppController () {
	/**
	 * keep scope clean
	 * @type {AppController}
	 */
	var scope = this;

	/**
	 * Global express.io object
	 * @type {Object}
	 */
    scope.app = global.app;

	/**
	 * Response file from public Folder
	 * @param  {Object} res
	 * @param  {String} path
	 * @return {void}
	 */
	scope.renderFile = function(res, file) {
		res.sendfile(global.app_path + '/app/views/' + file)
	}
}

module.exports = AppController;
