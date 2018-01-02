/* Convert the tld.txt file to JSON */

const fs = require('fs');
const path = require('path');

const readPath = path.join(__dirname, './tld.txt');
const writePath = path.join(__dirname, '../src/json/tld.json');

function readTLD() {
    fs.readFile(readPath, 'utf8', (err, data) => {
        if (err) throw err;

        /* Because the tld.txt has 1 description line at the top, we need to cut it out of the final
           split string, hence the code structure below.
        */
        const i = data.indexOf('\n');
        const tld_array = data.slice(i + 1).split('\n');
        const tld_array_json = JSON.stringify(tld_array);

        // Write the JSON
        fs.writeFile(writePath, tld_array_json, (err) => {
            if (err) throw err;
            console.log(`Successfully wrote JSON at ${writePath}`);
        });
    })
}

readTLD();