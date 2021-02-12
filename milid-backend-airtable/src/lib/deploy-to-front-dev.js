const fs = require('fs-extra');
const path = require('path');

const devFolderPath = '../milid-frontend/';

const distFolderPath = './dist';

const dataFilename = 'data.json';

if(!fs.existsSync(devFolderPath)){
    console.error("can't find folder", devFolderPath);
    process.exit(1);
}

if(!fs.existsSync(distFolderPath)){
    console.error("can't find dist folder", distFolderPath);
    process.exit(1);
}

const staticFilePath = path.join(devFolderPath, 'public', dataFilename);

const dataFilePath = path.join(distFolderPath, dataFilename);

fs.copySync(dataFilePath, staticFilePath);

console.log("copied", dataFilePath, "to", staticFilePath);


