
const extractRawAirtable = require('./extract_raw_airtable');

const { writeFileSync } = require('fs');

async function main(){
    const airtableData = await extractRawAirtable();

    writeFileSync('./airtable_data.json', JSON.stringify(airtableData, null, 2), {encoding:'utf-8'});

}


main();