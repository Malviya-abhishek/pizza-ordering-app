const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const authController = require('../app/http/controllers/authController');
const orderController = require('../app/http/controllers/customers/orderController');
const adminOrderController = require('../app/http/controllers/admin/orderController');
const StatusController = require('../app/http/controllers/admin/statusController');

// Middleware
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');


function initRoute(app) {
  // home
  app.get('', homeController().index);

  // auth
  app.get('/login',guest, authController().login);
  app.post('/login',guest, authController().postLogin);
  app.get('/register',guest, authController().register);
  app.post('/register',guest, authController().postRegister);
  app.post('/logout', authController().postLogout);

  //cart
  app.get('/cart', cartController().index);
  app.post('/update-cart', cartController().update);

  // customer routes
  app.post('/orders', auth, orderController().store);
  app.get('/customer/orders', auth, orderController().index);
  app.get('/customer/order/:id', auth, orderController().show);

  // Admin routes
  app.get('/admin/orders', admin, adminOrderController().index);
  app.post('/admin/order/status', admin, StatusController().update);
}

module.exports = initRoute;


// app.get('', (req, res) => {
//   res.render('home')
// });