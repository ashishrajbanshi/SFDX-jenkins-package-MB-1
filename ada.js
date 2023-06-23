const fs = require('fs');
const path = require('path');
const username = 'ada.cq.com'//process.argv[2];
const configFolderPath = path.join(__dirname, 'config', username);
const configFilePath = path.join(configFolderPath, 'external.package.json');
console.log(configFilePath);
const files = fs.readdirSync(configFolderPath);
const content = fs.readFileSync(configFilePath, 'utf8');
// Parse the JSON data
const parsedData = JSON.parse(content);
console.log(parsedData.destNamespacePrefix);
