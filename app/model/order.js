const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerId:{
    type:mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    require:true,
  },
  items:{
    type: Object,
    require: true,
  },
  phone:{
    type: String,
    require:true
  },
  address:{
    type:String,
    require:true
  },
  paymentType:{
    type:String,
    default:"COD"
  },
  status:{
    type:String,
    default:"order_place"
  }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
