const marked = require('marked');
// const md = require('markdown-it')();
// var result = md.render('# markdown-it rulezz!');


const fs = require('fs');
function writeSourceToDisk(lesson){
    const filename = `./dist/sourceFile_lesson_id_.${lesson.id}.md`;
    fs.writeFileSync(filename, lesson.sources, {encoding: 'utf-8'});
}
function writeTransformedToDisk(lesson){
    const filename = `./dist/sourceFile_lesson_id_.${lesson.id}.html`;
    fs.writeFileSync(filename, lesson.sources, {encoding: 'utf-8'});
}

module.exports = function sourceTransformer(lesson){

    if(!lesson.sources) return lesson;

    // writeSourceToDisk(lesson);

    const renderer = new marked.Renderer();

    renderer.link = function(href, title, text){
        const link = marked.Renderer.prototype.link.call(this, href, title, text);
        return link.replace("<a", "<a target='_blank' ");
    }

    const options = { renderer: renderer };

    lesson.sources = marked(lesson.sources, options);
    // lesson.sources = md.render(lesson.sources);
    // writeTransformedToDisk(lesson);

    return lesson;
}