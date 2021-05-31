// keywords factory functions | closuers
const Menu = require('../../model/menu');

function homeController() {
  return {
    // index : function(){}
    // this is a async function ( made by adding async at the start )
    async index(req, res) {
      const pizzas = await Menu.find();   
      
      return res.render('home', {pizzas: pizzas});
    },

  };
}

module.exports = homeController;

// Menu.find().then(
//   (pizzas) => {
//     console.log(pizzas);
//     return res.render('home', { pizzas: pizzas });
//   }
// );