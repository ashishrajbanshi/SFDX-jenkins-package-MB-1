const fs = require('fs');
const path = require('path');

function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  const files = fs.readdirSync(source);

  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      fs.readFile(sourcePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const modifiedData = data.replace(/__c/g, '__r');

        fs.writeFile(destinationPath, modifiedData, 'utf8', (err) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`File "${destinationPath}" has been copied and modified.`);
        });
      });
    }
  });
}

// Usage example:
const sourceDir = '../force-app';
const destinationDir = 'bin/force-app';
fs.mkdirSync(destinationDir);

copyDirectory(sourceDir, destinationDir);
