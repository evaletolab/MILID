const mdTransformer = require('./transformers/md_transformer');
const svgTransformer = require('./transformers/svg_transformer');
const sourcesTransformer = require('./transformers/sources_transformer');

const LessonType = require('./LessonType');
const svg_transformer = require('./transformers/svg_transformer');

const { insecables } = require('./typeHelper');

const marked = require('marked');
const { INFOGRAPHIC } = require('./LessonType');

const assetShouldBeDownloaded = require('./assetHelpers');

module.exports = function lessonTransformer(data){
    // const urlForAssetId = (id) => {
    //     const asset = data.assets.find(asset => asset.airtable_id == id);
    //     if(!asset){
    //         throw new Error(`no asset with id ${id}`);
    //     }
    //     return asset.media[0].url;
    // }
    const urlForAssetId = (id) => {
        const asset = data.assets.find(asset => asset.airtable_id == id);
        if(!asset){
            throw new Error(`no asset with id ${id}`);
        }

        if(assetShouldBeDownloaded(asset)){
            return `/assets/${asset.media[0].filename}`;
        }else{
            return asset.media[0].url;
        }
    }

    data.lessons = data.lessons.map((lesson) => {

        if(lesson.type.length != 1){
            throw new Error("lesson with invalid type field");
        }
        lesson.type = lesson.type[0];
        
        if(lesson.cover){
            lesson.cover = urlForAssetId(lesson.cover[0]);
        }

        if(lesson.media){
            lesson.media = urlForAssetId(lesson.media[0]);
        }

        if(lesson.quiz){
            lesson.quiz = marked(insecables(lesson.quiz));
        }

        lesson.title = insecables(lesson.title);

        lesson = sourcesTransformer(lesson);

        switch(lesson.type){
            case LessonType.MARKDOWN:
                lesson = mdTransformer(lesson, data);
                break;
            case LessonType.PODCAST:
                break;
            case LessonType.VIDEO:
                break;
            case LessonType.INFOGRAPHIC:
                lesson = svg_transformer(lesson);
                if (lesson.markdown) {
                    lesson = mdTransformer(lesson, data);
                }
                break;
            default:
                throw new Error("unsupported LessonType", lesson.type);
        }
        return lesson;
    });

    return data;
}