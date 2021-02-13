const marked = require('marked');


module.exports = function mdTransformer(lesson, globalData){

    const renderer = new marked.Renderer();

    const urlForAssetId = (assetId) => {
        const asset = globalData.assets.find(asset => asset.id == assetId);
        if(!asset){
            throw new Error(`no asset with id ${assetId}`);
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

    renderer.link = function(href, title, text){
        let link;
        
        if(!href.startsWith('http://') || !href.startsWith('https://')){
            return `<span class="_definition" data-definition-id="${href}">${text}</span>`;
        }else{
            link = marked.Renderer.prototype.link.call(this, href, title, text);
        }

        return link;
    }

    const options = { renderer: renderer };

    lesson.html = marked(lesson.markdown, options);
    delete lesson.markdown;

    return lesson;
}