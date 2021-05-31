function cartController() {
  return {
    index(req, res) {
      res.render('customers/cart');
    },
    update(req, res) {

      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0
        }
      }
      
      const cart = req.session.cart
      const order = req.body;

      if (!cart.items[order._id])
        cart.items[order._id] = {qty:0, item:order}

      cart.items[order._id].qty += 1;
      cart.totalQty += 1;
      cart.totalPrice += 1.0 * order.price;

      // console.log(order);
      console.log(req.session.cart);

      return res.json({ totalQty : cart.totalQty });
    },
  }
}

module.exports = cartController;

// let cart = {
//   item:{
//     pizzaId : {}
//   },
//   totalQty:0,
//   totalPrice:0
// }