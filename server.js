const express = require('express');
const path = require('path');
const app = express();

// server router...
// add above this if statements..
// router configuration before the webpack and the app.get('*', (req, res) =>

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  // tell express that everything that is in the 'dist'
  // folder should be free to use for everyone who asks for it
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    // to make sure that react router is working correctly.
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  })
}

// not all deployment sites let's you choose your own port like AWS.
// they want you to bind to a port specificed by the server
app.listen(process.env.PORT || 3050, () => console.log('Listening'));
