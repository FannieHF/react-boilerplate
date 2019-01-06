const path = require('path');
const shell = require('shelljs');

shell.exec(`npx webpack --config ${path.join(__dirname, '../webpack.prod.config.js')} --colors --progress`);