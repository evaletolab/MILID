const mdTransformer = require('./transformers/md_transformer');

const LessonType = require('./LessonType');

module.exports = function lessonTransformer(data){

    data.lessons = data.lessons.map((lesson) => {
        switch(lesson.type[0]){
            case LessonType.MARKDOWN:
                lesson = mdTransformer(lesson, data);
                break;
            default:
                throw new Error("unsupported LessonType", lesson.type);
        }
        return lesson;
    });

    return data;
}