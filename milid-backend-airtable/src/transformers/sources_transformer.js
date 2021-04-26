const marked = require('marked');
// const md = require('markdown-it')();
// var result = md.render('# markdown-it rulezz!');
module.exports = function sourceTransformer(lesson){

    if(!lesson.sources) return lesson;

    const renderer = new marked.Renderer();

    renderer.link = function(href, title, text){
        const link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace("<a", "<a target='_blank' ");
    }

    const options = { renderer: renderer };

    lesson.sources = lesson.sources.replace(/(\?)( )(_)/, "$1$3");

    lesson.sources = marked(lesson.sources, options);
    // lesson.sources = md.render(lesson.sources);

    return lesson;
}