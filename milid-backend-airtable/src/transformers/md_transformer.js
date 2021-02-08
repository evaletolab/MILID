const marked = require('marked');


module.exports = function mdTransformer(lesson, globalData){

    const renderer = new marked.Renderer();

    const urlForAssetId = (assetId) => {
        const asset = globalData.assets.find(asset => asset.asset_id == assetId);
        if(!asset){
            throw new Error("no asset with id", assetId);
        }
        return asset.media[0].url;
    }

    renderer.image = function(href, title, text){
        if(!href.startsWith('http://') || !href.startsWith('https://')){
            href = urlForAssetId(href)
        }
        const img = marked.Renderer.prototype.image.call(this, href, title, text);
        return img;
    }

    const options = { renderer: renderer };

    lesson.html = marked(lesson.markdown, options);
    delete lesson.markdown;

    return lesson;
}