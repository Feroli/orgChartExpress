'use strict';

let express = require('express');

let port = process.env.PORT || 5000;

let path = require('path');
let app = express();
let events = require('./scripts/eventsController');
let blog = require('./scripts/blogController');
let rootPath = path.normalize(__dirname + '/../');
let bodyParser = require('body-parser');

// for seo purposes
app.use(require('prerender-node'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(rootPath + '/public'));

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/data/event/:id', events.get);
app.get('/data/event', events.getAll);
app.post('/data/event/:id', events.save);

app.get('/data/blog/:id', blog.get);
app.get('/data/blog', blog.getAll);
app.post('/data/blog/:id', blog.save);

app.get('*', function(req, res) {
    res.sendFile(rootPath + '/public/ondemand-loading-data/index.html');
});

app.listen(port, function(err) {
    if (err) {
        console.log('There was an error creating the system');
    }
    console.log('running server on port ' + port);
});
