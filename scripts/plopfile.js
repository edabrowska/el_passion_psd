/* eslint-disable */
const helpers = require('handlebars-helpers')();

module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('reducer', require('./plop-generators/reducer-generator.js'));
  plop.setGenerator('action', require('./plop-generators/action-generator.js'));
  plop.setGenerator('component', require('./plop-generators/component-generator.js'));
};
