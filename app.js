//required modules
const express = require('express'),
 mongoose = require('mongoose'),
 MongoClient = require('mongodb').MongoClient,
 co = require('co'),
 bodyParser = require('body-parser'),
 cors = require('cors');

 const config = require('./config/database');

//connect to database
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + config.database);
});

//ON Error
mongoose.connection.on('error', (err) => {
	console.log('Database error ' + err);
});

//initilize Express app
const app = express();

const Services = require('./routes/services');
const Categories = require('../portfolio/routes/categories');
//port number
const port = 3000;

//Set static folder
//app.use(express.static(path.join(__dirname, 'public')));

//Cors middleware
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());


app.use('/api/services', Services);
app.use('/api/categories', Categories);

app.get('/', (req, res) => {
	res.send('Invalid Endpoint');
});

app.listen(port, () => {
	console.log('Server started on port ' + port);
});
