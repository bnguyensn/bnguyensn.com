/** parse-svg,js
 * Parse an .svg file and return a .json file
 * */

'use strict';

const fs = require('fs');

/** ********** REGEX ********** **/

// (...) - Capture group
// [...] - Or
// * - One or more
// \D - Match non-digits
// [\s\S]* - Match any character that is whitespace or not whitespace, multiple times
// [^"]* - Match everything but "
// g tag - Global search

const regexEmptyTag = /<(\S*)\s*(\S[^\/]*)\/>/g;  // Regex for empty XML tags

const regexAttr = /(\S*)="([^"]*)"\s*/g;  // Regex for attributes

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
            let regexTagArray;
            let count = 0;
            while ((regexTagArray = regexEmptyTag.exec(data)) !== null) {
                // XML tag layer
                const tagName = `${regexTagArray[1]}_${count}`;
                const attrStr = regexTagArray[2];

                // XML tag's attributes layer
                let regexAttrArray;
                let tagAttrs = {};
                while ((regexAttrArray = regexAttr.exec(attrStr)) !== null) {
                    tagAttrs[regexAttrArray[1]] = regexAttrArray[2];
                }
                regexAttr.lastIndex = 0;

                // XML tag layer
                svgObj[tagName] = tagAttrs;
                count += 1;
            }
        }

        fs.writeFile('output.json', JSON.stringify(svgObj, null, '\t'), (err) => {
            if (err) throw err;
            console.log('File saved successfully');
        });
    });
}

parseSVG('src/widgets/world-travel-map/img/world2.svg','./');