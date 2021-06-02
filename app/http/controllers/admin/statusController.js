const Order = require('../../../model/order');

function statusController() {
  return {
    update(req, res) {
      Order.updateOne({ _id: req.body.orderId }, { status: req.body.status }, (err, data) => {
        if (err) {
          // to handel err
          return res.redirect('admin/orders');
        }
        // Emit event for order update
        const eventEmitter = req.app.get('eventEmitter');
        eventEmitter.emit('orderUpdated',
          {
            id: req.body.orderId,
            status: req.body.status
          }
        );
        return res.redirect('/admin/orders');
      });
    }
  }
}

module.exports = statusController;