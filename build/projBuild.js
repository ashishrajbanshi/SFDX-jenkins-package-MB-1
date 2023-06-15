const fs = require('fs');
const path = require('path');
const { mkdirp } = require('mkdirp')

// function copyFile(source, destination) {
//     return new Promise((resolve, reject) => {
//         const readStream = fs.createReadStream(Source, (err, data) => {
//             //     if (err) {
//             //         console.error(err);
//             //         return;
//             //     });

//         const reg = /(\w+)(\__c)/g;
//         const modifiedData = data.replace(reg, `compliancequest__$1$2`);
//         const writeStream = fs.createWriteStream(destination, modifiedData);

//         readStream.on('error', reject);
//         writeStream.on('error', reject);

//         writeStream.on('finish', resolve);
//         readStream.pipe(writeStream);
//     });
// }

function copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
        mkdirp.sync(destination);
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

                const reg = /(\w+)(\__c)/g;
                const modifiedData = data.replace(reg, `compliancequest__$1$2`);

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

const sourceDir = process.argv[2];
const destinationDir = 'bin/force-app';

copyDirectory(sourceDir, destinationDir);
