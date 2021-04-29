// list of media types that are not downloaded from airtable

const mediaSkipList = ["video/mp4"];

function assetShouldBeDownloaded(asset){
    const assetType = asset.type[0];
    return mediaSkipList.indexOf(assetType) < 0; 
}

module.exports = assetShouldBeDownloaded;