// CLient side code
const axios = require('axios');
const Noty = require('noty');
import moment from 'moment';
import { initAdmin } from './admin';

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
  // Ajax call
  axios.post('/update-cart', pizza)
    .then(res => {
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: 'success',
        text: 'Added to cart',
        timeout: 1000,
        progressBar: false,
        // layout: 'bottomLeft'
      }).show()
    })
    .catch(err => {
      new Noty({
        type: 'error',
        text: 'Something went wrong',
        timeout: 1000,
        progressBar: false,
        // layout: 'bottomLeft'
      }).show()
    })
}

addToCart.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let pizza = btn.dataset.pizza
    pizza = JSON.parse(pizza);
    updateCart(pizza);
  })
});

const alertMsg = document.querySelector('#success-alert');
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}


// Change order status
let statues = document.querySelectorAll('.status_line');
let hiddenInput = document.querySelector("#hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
let time = document.createElement('small');

function updateStatus(order) {
  let stepCompleted = true;

  statues.forEach((status)=>{
    status.classList.remove('step-comleted');
    status.classList.remove('current');
  })


  statues.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add('step-completed')
    }
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format('hh:mm A');
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add('current');
      }
    }
  });
}

updateStatus(order);

//Sockets

let socket = io();
initAdmin(socket);

// Join 
if(order){
  socket.emit('join', `order_${order._id}`);
}

let adminAreaPath = window.location.pathname;

if(adminAreaPath.includes('admin')){
  socket.emit('join', 'adminRoom');
}



socket.on('orderUpdated', (data)=>{
  const updatedOrder = {...order};
  updatedOrder.updatedAt = moment().format();
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
  new Noty({
    type: 'success',
    text: 'Order Updated',
    timeout: 1000,
    progressBar: false,
    // layout: 'bottomLeft'
  }).show()
});


