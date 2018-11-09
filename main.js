'use strict'
require('babel-register')({
    presets: ['es2015', 'react']
});
module.exports = require('./server.js')