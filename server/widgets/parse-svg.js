// @flow
'use strict';

/** ********** PARSE SVG **********
 *
 * This parses a .svg file and returns a .json file containing the .svg's characteristics
 *
 * ***************************** */

const fs = require('fs');

/**
 * @param {string} inputPath - Path to the .svg in question
 * @param {string} outputPath - Path where the resulting .json will be saved=
 * */
export function parseSVG(inputPath: string, outputPath: string) {
    let resultStr;
    fs.readFile(inputPath, 'utf8', (err, data) => {
        if (err) throw err;
        resultStr = data;
    });
}

parseSVG('../../src/widgets/world-travel-map/img/world2.svg','./');