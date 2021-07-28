import JSZip from "jszip";
import fs from "fs";

import { anonymizerRegex, anonymizerPrefixRegex } from "../src/globals.js";

const fbZipLocation = process.env.FB_ZIP_LOCATION;

let mapping = {};
fs.readFile(fbZipLocation, function (err, data) {
    if (err) throw err;
    JSZip.loadAsync(data).then(async function (zip) {
        const files = zip.file(/\.json$/);
        for (let thisFile of files) {
            const str = await thisFile.async("string");
            const data = JSON.parse(str);
            if (Object.keys(data).length == 1) {
                const api = Object.keys(data)[0];
                if (
                    data[api].constructor !== Array &&
                    Object.keys(data[api]).length == 1
                ) {
                    mapping[thisFile.name] = `${api}/${
                        Object.keys(data[api])[0]
                    }`;
                } else {
                    mapping[thisFile.name] = api;
                }
            } else {
                let anonymizedFileName = thisFile.name.replace(
                    anonymizerPrefixRegex,
                    "uniqueid"
                );
                anonymizedFileName = anonymizedFileName.replace(
                    anonymizerRegex,
                    "uniqueid_hash"
                );
                anonymizedFileName = anonymizedFileName.replace(
                    /\d+(?=\.json$)/,
                    "#"
                );
                mapping[
                    anonymizedFileName
                ] = `dataStructure:${data.constructor.name}`;
            }
        }
        console.log(JSON.stringify(mapping));
    });
});
