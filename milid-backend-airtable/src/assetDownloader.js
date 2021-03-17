const { writeFileSync } = require('fs');
const got = require('got');


const assetShouldBeDownloaded = require('./assetHelpers');

async function download (url, destinationPath) {
    try {
        const responsePromise = got(url);
	    const bufferPromise = responsePromise.buffer();

        const [response, buffer] = await Promise.all([responsePromise, bufferPromise]);

        const isSvg = destinationPath.endsWith('.svg');

        if(isSvg){
            let svgStr = buffer.toString()
                .replace(/font-family="'SuisseEDUIntl-Bold'"/g, `font-family="suisse" font-weight="bold"`)
                .replace(/SuisseEDUIntl/g, "suisse");

            writeFileSync(destinationPath, svgStr, {"encoding": "utf-8"});
        }else{
            writeFileSync(destinationPath, buffer, {"encoding": "binary"});
        }

        console.log(destinationPath, "written");
	} catch (error) {
		console.log(error);
        throw new Error(error);
	}
};


async function downloadAssets(data){

    const assets = data.assets;

    for(const asset of assets){
        if(assetShouldBeDownloaded(asset)){
            const destinationFilePath = `./dist/assets/${asset.media[0].filename}`;
            const url = asset.media[0].url;
            await download(url, destinationFilePath);
        }else{
            console.log("skipping download of asset", asset.media[0].filename);
        }
    }

    console.log("assets downloaded");
}

module.exports = downloadAssets;


