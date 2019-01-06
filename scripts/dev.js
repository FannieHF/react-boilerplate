const path = require('path');
const fs = require('fs-extra');
const shell = require('shelljs');


// Copy files
const src = path.join(__dirname, '../app');
const dist = path.join(__dirname, '../public');

fs.ensureDirSync(dist);
fs.ensureDirSync(`${dist}/images`);

shell.cp('-Rf', `${src}/images/*.*`, `${dist}/images`);
shell.cp('-Rf', `${src}/icons/favicon.ico`, dist);


// Execute pack commands
shell.exec(`npx webpack --config ${path.join(__dirname, '../webpack.dll.config.js')} --colors --progress`);
shell.exec(`npx webpack-dev-server --config ${path.join(__dirname, '../webpack.dev.config.js')} --colors --progress --open`);
