
module.exports = function mdTransformer(lesson, globalData){

    const options = { renderer: renderer };

    // lesson.url = globalData.;
    delete lesson.markdown;

    return lesson;
}