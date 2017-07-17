//required modules
const express = require('express'),
 mongoose = require('mongoose'),
 MongoClient = require('mongodb').MongoClient,
 co = require('co'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 app = express();

const config = require('./config/database');


//connect to db
co(function*(){

	var db = yield MongoClient.connect(config.database);
	console.log('Connected to database' + db);

}).catch(function(err){
	console.log(err.stack);
});

//middleware
app.use(cors());
app.use(bodyParser.json());

//required route files
const services = require('./routes/services');

//Routes
app.get('/', (req, res) =>{
	res.send('Invalid Endpoint');
});

app.use('/api/services', services);


//Start Server
app.listen(config.port, ()=>{
	console.log('Listening on port ' + config.port);

});


