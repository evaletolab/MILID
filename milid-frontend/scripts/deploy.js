// setup env variables
require('dotenv').config(); 

const { copySync } = require('fs-extra');
const rsync_deploy = require('./rsync-deploy');

if(process.argv.length != 3){
    console.error("missing argument (expecting prod or dev keyword)");
    process.exit(1);
}

const deployMode = process.argv[2].toLowerCase();
const supportedDeployModes = ['dev', 'prod'];

if(supportedDeployModes.indexOf(deployMode) < 0){
    console.error("invalid argument (expected 'prod' or 'dev')");
    process.exit(1);
}

console.log("running in", deployMode, "mode");

// 1 copy htaccess to dist
try{
    copySync('./htaccess/.htaccess', './dist/.htaccess');
    console.log("copied htaccess file");
}catch(e){
    console.error("failed to copy .htaccess file", e);
    process.exit(1);
}

// 2 copy php events route
try{
    copySync('../php-analytics/sqlite/src', './dist/event');
    console.log("copied php-analytics directory");
}catch(e){
    console.error("failed to copy php-analytics directory", e);
    process.exit(1);
}


// deploy via rsync

const run_deploy = async (options) => {
    console.log(options);
    try{
        console.log("rsync deploy started");
        await rsync_deploy(options);
        console.log("rsync deploy complete");
        console.log("all done");
    }catch(e){
        console.error("rsync deploy failed", e);
        process.exit(1);
    }
}

const isDevMode = deployMode == 'dev';
const options = {
    user: isDevMode ? process.env.DEV_RSYNC_USER : process.env.PROD_RSYNC_USER,
    password: isDevMode ? process.env.DEV_RSYNC_PASSWORD : process.env.PROD_RSYNC_PASSWORD,
    host: isDevMode ? process.env.DEV_RSYNC_HOST : process.env.PROD_RSYNC_HOST,
    target_directory: isDevMode ? process.env.DEV_RSYNC_TARGET_DIRECTORY : process.env.PROD_RSYNC_TARGET_DIRECTORY,
};

run_deploy(options);