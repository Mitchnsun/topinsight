var UglifyJS = require("uglify-js");
var fs = require('fs');

var result = UglifyJS.minify([
    "node_modules/jquery/dist/jquery.js",
    "node_modules/underscore/underscore.js",
    "node_modules/backbone/backbone.js",
    "work/js/*.js"
], {
    outSourceMap: "www/js/output.js.map",
    outFileName: "www/js/output.js"
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