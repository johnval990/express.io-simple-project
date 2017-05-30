var AppController = require('./AppController');
var util = require('util');

/**
 * controller Customer extends AppController
 */
function Customer() {
    /**
	 * init parent model
	 */
	util.inherits(Customer, AppController);
	AppController.call(this);
	var scope = this;

	/**
	 * Routes
	 */
	app.get('/', getHome);
	app.get('/login', getLogin);
	app.post('/login', postLogin);
    app.io.route('get_customer', scktCustomer);

	/**
	 * GET Index page
	 * @param  {Object} req
	 * @param  {Object} res
	 * @return {File}
	 */
	function getHome(req, res) {
		console.log(req.session);
        scope.renderFile(res, 'index.html')
    }

	/**
	 * GET Login page
	 * @param  {Object} req
	 * @param  {Object} res
	 * @return {File}
	 */
	function getLogin(req, res) {
        scope.renderFile(res, 'login.html')
    }

	/**
	 * POST Login
	 * @param  {Object} req
	 * @param  {Object} res
	 * @return {json}
	 */
	function postLogin(req, res) {
		//if(req.body.username == 'john' && req.body.password == 'smith') {
			req.session.auth = true;
        	req.session.loginDate = new Date().toString()
			req.session.username = req.body.username;
			res.json({ 'success': true });
		// }
		// else {
		// 	res.json({ 'success': false, 'message': 'Invalid username or password' });
		// }
    }

	/**
	 * SOCKET Customer
	 * @param  {Object} req
	 */
    function scktCustomer(req) {
        // req.session.name = req.data
        // req.session.save(function() {
        //     req.io.io.emit('customer')
        // });

		req.io.emit('customer_connect', {'user': req.session.username});
    }
}

module.exports = new Customer();
