const marked = require('marked');
const { insecables } = require('../typeHelper');

const assetShouldBeDownloaded = require('../assetHelpers');

module.exports = function mdTransformer(lesson, globalData){

    const renderer = new marked.Renderer();

    // const urlForAssetId = (assetId) => {
    //     const asset = globalData.assets.find(asset => asset.id == assetId);
    //     if(!asset){
    //         throw new Error(`no asset with id ${assetId}`);
    //     }
    //     return asset.media[0].url;
    // }
    
    const urlForAssetId = (assetId) => {
        const asset = globalData.assets.find(asset => asset.id == assetId);
        if(!asset){
            throw new Error(`no asset with id ${assetId}`);
        }

        if(assetShouldBeDownloaded(asset)){
            return  `/assets/${asset.media[0].filename}`;
        }else{
            return asset.media[0].url;
        }
    }

    ////////////
    // [40%](foo)   40% is size hint   foo is asset_id
    renderer.image = function(href, title, text){
        // console.log(href, text, title);
        if(!href.startsWith('http://') || !href.startsWith('https://')){
            href = urlForAssetId(href)
        }

        const img = marked.Renderer.prototype.image.call(this, href, title, text);
        
        let sizeHint = "";
        const parsedAltText = parseInt(text);
        if(!isNaN(parsedAltText)) { 
            sizeHint = text; 
            return img.replace("<img", `<img data-size="${sizeHint}" `);
        }

        return img;
    }

    renderer.link = function(href, title, text){
        let link;
        
        if(!href.startsWith('http://') || !href.startsWith('https://')){
            const definitionKey = href;

            if(!globalData.definitions.find(def => def.id === definitionKey)){
                throw new Error(`no definition with key ${definitionKey}`);
            }

            return `<span class="_definition" data-definition-id="${definitionKey}">${text}</span>`;
        }else{
            link = marked.Renderer.prototype.link.call(this, href, title, text);
        }

        return link;
    }

    const options = { renderer: renderer };

    lesson.markdown = insecables(lesson.markdown);

    lesson.html = marked(lesson.markdown, options);
    delete lesson.markdown;

    return lesson;
}