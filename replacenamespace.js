const fs = require('fs');
 const filePath = path.join(__dirname, 'force-app/main/default/main/default/classes/', 'MB_Movie_Controller.cls');
const fileContent = fs.readFileSync(filePath, 'utf8');
const oldValue = 'public';
const newValue = 'CQ_UI_Detail';
const updatedContent = fileContent.replace(new RegExp(oldValue, 'g'), newValue);
fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Value replaced successfully.');
