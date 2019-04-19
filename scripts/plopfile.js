/* eslint-disable */
const helpers = require('handlebars-helpers')();

module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('component', require('./plop-generators/component-generator.js'));
  plop.setGenerator('section', require('./plop-generators/section-generator.js'));
};
