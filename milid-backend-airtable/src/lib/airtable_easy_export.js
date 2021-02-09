const Airtable = require('airtable');
require('dotenv').config();

function export_table_from_base(table_name, base_key, view="Grid view"){

    return new Promise((resolve, reject) => {
        const base = new Airtable({ apiKey: process.env.API_KEY }).base(base_key);

        let result = [];

        base(table_name).select({
            // Selecting the first 3 records in Grid view:
            maxRecords: 250,
            view: view
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.

            records.forEach(function (record) {
                result.push(record);
            });

            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();

        }, function done(err) {
            if (err) { 
                reject(err);
             }else{
                resolve(result);
             }
        });
    });
}

module.exports = export_table_from_base;
