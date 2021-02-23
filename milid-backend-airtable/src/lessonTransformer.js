const mdTransformer = require('./transformers/md_transformer');
const svgTransformer = require('./transformers/svg_transformer');
const sourcesTransformer = require('./transformers/sources_transformer');

const LessonType = require('./LessonType');
const svg_transformer = require('./transformers/svg_transformer');

module.exports = function lessonTransformer(data){
    const urlForAssetId = (id) => {
        const asset = data.assets.find(asset => asset.airtable_id == id);
        if(!asset){
            throw new Error(`no asset with id ${id}`);
        }
        return asset.media[0].url;
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
                break;
            default:
                throw new Error("unsupported LessonType", lesson.type);
        }
        return lesson;
    });

    return data;
}