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

const staticFolderPath = path.join(devFolderPath, 'public', 'data');

fs.emptyDirSync(staticFolderPath);

fs.copySync(distFolderPath, staticFolderPath);

console.log("copied", distFolderPath, "to", staticFolderPath);


