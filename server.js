require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const initRoute = require('./routes/web');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');

const PORT = process.env.PORT || 3000;

// database connection
const uri = 'mongodb://localhost/pizzadb'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
// checking for connection
connection.once('open', () => {
  console.log("Database connected...");
}).catch(err => {
  console.log('Connection failed...', err);
});

// Session Store
const mongoStore =  MongoDbStore.create({
  client:connection.client,
  collection: 'sessions',
  clear_interval: 300,  // 5 * 60 seconds
  // mongoUrl:uri,
});

//Session config
app.use(session({
  secret: process.env.COOKIE_SECERET,
  resave: false,
  store: mongoStore,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

app.use(flash());


//Assets
app.use(express.static('public'));
app.use(express.json());

//Global Middleware
app.use( (req, res, next)=>{
  res.locals.session = req.session
  next();
});

//Set template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

//Routes
initRoute(app);


app.listen(PORT, () => {
  console.log("Listing on port:", PORT);
  console.log("URL", `http://localhost:${PORT}`);
});

