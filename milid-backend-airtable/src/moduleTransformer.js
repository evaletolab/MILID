
module.exports = function moduleTransformer(data){
    const lessonWithId = (id) => {
        const lesson = data.lessons.find(lesson => lesson.airtable_id == id);
        if(!lesson){
            throw new Error(`no lesson with id ${id}`);
        }
        return lesson;
    }

    data.modules = data.modules.map((module) => {
        module.lessons = module.lessons.map(lessonWithId);
        return module;
    });

    // add index to each lesson
    for(const module of data.modules){
        module.lessons = module.lessons.map((lesson, index) => {
            lesson.index = index + 1;
            return lesson;
        });
    }

    return data;
}