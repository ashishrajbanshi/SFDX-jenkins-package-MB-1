const fs = require('fs');
const path = require('path');
const dirname = __dirname
const { mkdirp } = require('mkdirp');
const replaceUtil = require('./replaceUtils.js');
const yargs = require('yargs');

const argv = yargs
  .option('source', {
    alias: 's',
    describe: 'Source folder path',
    demandOption: true,
    type: 'string'
  })
  .argv;
  const sourceArg = argv.source;
  console.log(sourceArg)
 
const sourceFolder = path.join(dirname, sourceArg);
const destinationFolder = path.join(dirname, 'test/apex');

// Copy files from source folder to destination folder
function copyFiles() {
    if (!fs.existsSync(destinationFolder)) {
        mkdirp.sync(destinationFolder);
    }
  try {

    const files = fs.readdirSync(sourceFolder);

    files.forEach((file) => {
        console.log(file)
      const sourceFilePath = path.join(sourceFolder, file); //source/scripts/filename[all]
      const destinationFilePath = path.join(destinationFolder, file);//test/apex/filename[all]
      fs.copyFileSync(sourceFilePath, destinationFilePath);
    });

    console.log('File copy completed successfully.');
    replaceText();
  } catch (err) {
    console.error('Error copying files:', err);
  }
}

// Replace text in files using regex
function replaceText() {
  try {
    const files = fs.readdirSync(destinationFolder);
    files.forEach((file) => {
      const filePath = path.join(destinationFolder, file);
      let content = fs.readFileSync(filePath, 'utf8');
    content = replaceUtil(content);//add a complaincequestnamespace ,  1->1 relation 
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Replaced text in ${filePath}`);
    });

    console.log('Text replacement completed successfully.');
  } catch (err) {
    console.error('Error replacing text:', err);
  }
}
// Start the file copy process
copyFiles();
console.log()