// CLient side code
// import axios from  'axios';
const axios = require('axios');
const Noty = require('noty');

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
  // Ajax call
  axios.post('/update-cart', pizza)
    .then(res => {
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type:'success',
        text: 'Added to cart',
        timeout: 1000,
        progressBar: false,
        // layout: 'bottomLeft'
      }).show()
    })
    .catch(err => {
      new Noty({
        type:'error',
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