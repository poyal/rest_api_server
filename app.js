// serverjs

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server --version0.1");
});

mongoose.connect('mongodb://certiware:certiware1!@ds031865.mlab.com:31865/customertalbe');

// DEFINE MODEL
var customer = require('./models/customer');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors({origin: 'http://localhost:8080'}));

// [CONFIGURE ROUTER]
var router = require('./routes')(app, customer);

// [RUN SERVER]
var server = app.listen(process.env.PORT || 3000 , function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Mongod server start");
});