
const express = require('express');
const app = express();
const cors = require('cors');

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var http = require('http').Server(app);
var io = require('socket.io')(http);
var routes = require('./routes/routes')(io);
const path = require('path');


const dbb = mongoose.connect("mongodb://user:tasks2018@ds137600.mlab.com:37600/tasksdb");
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connecté");
});
app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    console.log("connected");
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
app.use('/', routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
var server = http.listen(process.env.PORT || 5000, function (io) {
    console.log('Example app listening on port 3000!')
})





