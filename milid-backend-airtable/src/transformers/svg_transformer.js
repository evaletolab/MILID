

module.exports = function svg_transformer(lesson){
    if(!lesson.svg){
        throw new Error(`lesson ${lesson.id} has no svg property`);
    }

    // replace root svg width with width='100%'
    // and replace root svg height with height='auto'
    lesson.svg = lesson.svg.replace(/width="\S*"/, 'width="100%"')
    .replace(/height="\S*"/, 'height="auto"');

    return lesson;
}