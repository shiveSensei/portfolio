const mongoose = require('mongoose');
const config = require('../config/database');
const co = require('co');
//Service Schema




const ServiceSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	}
});

const Service = module.exports = mongoose.model('Service', ServiceSchema);

//---------------------FUNCTIONS

//Get Services
module.exports.getServices = function (callback){
	
	Service.find(callback);

}

//Add Service to db
module.exports.addService = function (newProduct, callback) {
	newProduct.save(callback);

}