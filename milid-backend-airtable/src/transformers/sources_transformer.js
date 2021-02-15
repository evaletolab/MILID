const marked = require('marked');

module.exports = function sourceTransformer(lesson){

    if(!lesson.sources) return lesson;

    const renderer = new marked.Renderer();

    renderer.link = function(href, title, text){
        const link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace("<a", "<a target='_blank' ");
    }

    const options = { renderer: renderer };

    lesson.sources = marked(lesson.sources, options);

    return lesson;
}