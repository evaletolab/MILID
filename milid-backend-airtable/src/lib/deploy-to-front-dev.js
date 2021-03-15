const fs = require('fs-extra');
const path = require('path');

const devFolderPath = '../milid-frontend/';

const distFolderPath = './dist';

const dataFilename = 'data.json';
const assetsDirectory = 'assets';

if(!fs.existsSync(devFolderPath)){
    console.error("can't find folder", devFolderPath);
    process.exit(1);
}

if(!fs.existsSync(distFolderPath)){
    console.error("can't find dist folder", distFolderPath);
    process.exit(1);
}


const dataSrcPath = path.join(distFolderPath, dataFilename);
const dataDestFilePath = path.join(devFolderPath, 'public', dataFilename);

fs.copySync(dataSrcPath, dataDestFilePath);
console.log("copied", dataSrcPath, "to", dataDestFilePath);

const assetsSrcFilePath = path.join(distFolderPath, assetsDirectory);
const assetsDestFilePath = path.join(devFolderPath, 'public', assetsDirectory);

fs.emptyDirSync(assetsDestFilePath);

fs.copySync(assetsSrcFilePath, assetsDestFilePath);
console.log("copied", assetsSrcFilePath, "to", assetsDestFilePath);


