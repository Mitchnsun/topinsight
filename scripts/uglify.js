var UglifyJS = require("uglify-js");
var fs = require('fs');

var result = UglifyJS.minify([
    "node_modules/handlebars/dist/handlebars.runtime.js",
    "node_modules/fastclick/lib/fastclick.js",
    "work/dist/*.js",
    "work/js/common/*.js"
], {
    outSourceMap: "output.js.map",
    outFileName: "output.js"
});

// Minified JS
fs.writeFile("www/js/output.js", result.code, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("output.js was saved!");
});

//Source map
fs.writeFile("www/js/output.js.map", result.map, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("output.js.map was saved!");
});