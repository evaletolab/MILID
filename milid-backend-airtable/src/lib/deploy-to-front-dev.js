const fs = require('fs-extra');
const path = require('path');

const devFolderPath = '../milid-frontend/';

const distFolderPath = './dist';

if(!fs.existsSync(devFolderPath)){
    console.error("can't find folder", devFolderPath);
    process.exit(1);
}

if(!fs.existsSync(distFolderPath)){
    console.error("can't find dist folder", distFolderPath);
    process.exit(1);
}

const staticFolderPath = path.join(devFolderPath, 'public');

fs.emptyDirSync(staticFolderPath);

const dataFilePath = path.join(distFolderPath, 'data.json');

fs.copySync(dataFilePath, staticFolderPath);

console.log("copied", dataFilePath, "to", staticFolderPath);


