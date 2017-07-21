const path = require('path'),
      express = require('express'),
      hbs = require('hbs'),
      fs = require('fs'),
      sassMiddleware = require('node-sass-middleware');
      routes = require('./routes.js');

const formatTimeDiff = require('./helper/formatTimeDiff.js');

const port = process.env.PORT || 3000;

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

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
