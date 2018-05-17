'use strict';

/** parse-svg =====================================
 * This parses a .svg file and returns a .json file
 * containing the .svg's characteristics
 * */

const fs = require('fs');

/** ********** REGEX ********** **/

// (...) - Capture group
// [...] - Or
// * - One or more
// [\s\S]* - Match any character that is not whitespace or whitespace, multiple times
// [^"]* - Match everything but "
// g tag - Global search

const attrRegex = /(\S*)="([^"]*)"\s*/g;

/** ********** PARSING FUNCTIONS ********** **/

/**
 * @param {string} inputPath - Path to the .svg in question
 * @param {string} outputPath - Path where the resulting .json will be saved
 * @param {array} [tags] - Array of svg tags to look for when parsing, if null -> parse everything
 * */
function parseSVG(inputPath, outputPath, tags) {
    fs.readFile(inputPath, 'utf8', (err, data) => {
        if (err) throw err;

        let svgObj = {};

        if (tags) {
            // TODO: limit parse to only passed tags
        } else {
            let regexArray;
            while ((regexArray = attrRegex.exec(data)) !== null) {
                svgObj[regexArray[1]] = regexArray[2];
            }
        }

        fs.writeFile('output.json', JSON.stringify(svgObj, null, '\t'), (err) => {
            if (err) throw err;
            console.log('File saved successfully');
        });
    });
}

parseSVG('src/widgets/world-travel-map/img/world2.svg','./');