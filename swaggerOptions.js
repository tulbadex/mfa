const swaggerDefinition = require('./swaggerDefinition');
const path = require('path');
const glob = require('glob');

const route = path.join(__dirname, 'app', 'routes');
const apiFiles = glob.sync(`${route}/*.js`);
const apiFilesGlob = path.join(__dirname, '..', 'app', 'routes', '*.js');

const options = {
    swaggerDefinition,
    apis: ['./index.js'],
    // apis: ['./app/routes/*.js'],
    // apis: apiFiles,
    // apis: [`${route}/*.js`],
    // apis: [path.join(route, '*.js')],
    // apis: [apiFilesGlob],
};
  
module.exports = options;