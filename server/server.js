const path = require('path'),
      express = require('express'),
      hbs = require('hbs'),
      fs = require('fs'),
      sassMiddleware = require('node-sass-middleware');
      routes = require('./routes.js');
      bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

var app = express();

// handlebars
app.set('view engine', 'hbs');
const partialPath = path.join(__dirname, '../views/partials');
hbs.registerPartials(partialPath);

// for serving static files
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// using sass
app.use(
  sassMiddleware({
    src: path.join(__dirname, '../public'),
    dest: path.join(__dirname, '../public'),
    debug: true
  })
);

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
