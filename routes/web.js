const homeController = require('../app/http/controllers/homeController');
const cartController = require('../app/http/controllers/customers/cartController');
const authController = require('../app/http/controllers/authController');
const guest = require('../app/http/middleware/guest');


function initRoute(app) {
  app.get('', homeController().index);
  app.get('/cart', cartController().index);
  app.get('/login',guest, authController().login);
  app.post('/login',guest, authController().postLogin);
  app.get('/register',guest, authController().register);
  app.post('/register',guest, authController().postRegister);
  app.post('/logout', authController().postLogout);
  app.post('/update-cart', cartController().update);
}

module.exports = initRoute;


  // app.get('', (req, res) => {
  //   res.render('home')
  // });