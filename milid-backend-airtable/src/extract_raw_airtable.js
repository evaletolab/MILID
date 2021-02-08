const fs = require('fs-extra');
const path = require('path');
const export_table = require('./lib/airtable_easy_export');


function fieldExtract(mediaRecord){
    let result = {
        id: mediaRecord.id,
    };

    result = Object.assign(result, mediaRecord.fields);

    return result;
}


let result = {};


module.exports = async function extractRawAirtable(){
    return export_table("assets", process.env.BASE_TOKEN)
    .then(assetRecords => {
        result.assets = assetRecords.map(fieldExtract);
        return export_table("modules", process.env.BASE_TOKEN);
    })
    .then(moduleRecords => {
        result.modules = moduleRecords.map(fieldExtract);
        return export_table("lessons", process.env.BASE_TOKEN);
    })
    .then(lessonRecords => {
        result.lessons = lessonRecords.map(fieldExtract);
        return export_table("palettes", process.env.BASE_TOKEN);
    })
    .then(paletteRecords => {
        result.palettes = paletteRecords.map(fieldExtract);
        return result;
    })
    .catch(err => console.log(err));
}


