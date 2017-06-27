'use strict';

let fs = require('fs');
let path = require('path');

let dataFile = path.dirname(require.main.filename);
let absolutePathToEvent = path.join(dataFile, '../public/data/event/');
// console.log("original:" + dataFile + "\n" + "joined: " + path.join(dataFile, '../public/data/event/'));
// let absolutePath = __dirname, '../public/data/event/';
console.log(absolutePathToEvent);

module.exports.get = function(req, res) {
    let event = fs.readFileSync(absolutePathToEvent +
     req.params.id + '.json', 'utf8');

    res.setHeader('Content-Type', 'application/json');
    res.send(event);
};

module.exports.save = function(req, res) {
    let event = req.body;
    fs.writeFileSync(absolutePathToEvent + req.params.id +
     '.json', JSON.stringify(event));

    res.send(event);
};

module.exports.getAll = function(req, res) {
    // let path = '../public/data/event';

    let files = [];
    try {
        files = fs.readdirSync(absolutePathToEvent);
    } catch (e) {
        console.log(e);
        res.send('[]');
        res.end();
    }
    let results = '[';
    for (let idx = 0; idx < files.length; idx++) {
        if (files[idx].indexOf('.json') === files[idx].length - 5) {
            results += fs.readFileSync(absolutePathToEvent + '/' + files[idx]) + ',';
        }
    }
    results = results.substr(0, results.length - 1);
    results += ']';

    res.setHeader('Content-Type', 'application/json');
    res.send(results);
    res.end();
};
