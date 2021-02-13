const fs = require('fs-extra');
const path = require('path');
const export_table = require('./lib/airtable_easy_export');


function fieldExtract(mediaRecord){
    let result = {
        airtable_id: mediaRecord.id,
    };

    result = Object.assign(result, mediaRecord.fields);

    return result;
}

function removeEmptyRecords(mediaRecord){
    return Object.keys(mediaRecord).length > 1;
}

let result = {};


module.exports = async function extractRawAirtable(){
    return export_table("assets", process.env.BASE_TOKEN)
    .then(assetRecords => {
        result.assets = assetRecords.map(fieldExtract).filter(removeEmptyRecords);
        return export_table("modules", process.env.BASE_TOKEN);
    })
    .then(moduleRecords => {
        result.modules = moduleRecords.map(fieldExtract).filter(removeEmptyRecords);
        return export_table("lessons", process.env.BASE_TOKEN);
    })
    .then(lessonRecords => {
        result.lessons = lessonRecords.map(fieldExtract).filter(removeEmptyRecords);
        return export_table("definitions", process.env.BASE_TOKEN);
    })
    .then(definitionRecords => {
        result.definitions = definitionRecords.map(fieldExtract).filter(removeEmptyRecords);
        return result;
    })
    .catch(err => console.log(err));
}


