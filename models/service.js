const mongoose = require('mongoose');
const config = require('../config/database');
const co = require('co');
const Schema = require('mongoose').Schema;
const Category = require('../models/category');
//Service Schema




const ServiceSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category:{
		type: Schema.Types.ObjectId,
		ref: 'Category',
		//required: true
	}

});

const Service = module.exports = mongoose.model('Service', ServiceSchema);

//---------------------FUNCTIONS

//Get Services
module.exports.getServices = function (callback){

	Service.find(callback);

}



module.exports.getByCategory = function (categoryId, callback){
	var query = {
		'category': categoryId
	};
	Service.find(query, function(err, services){
		if(err){
			throw err;
		}else {
			res.json(services);
		}
	});
}



//Add Service to db
module.exports.addService = function (newProduct, callback) {
	newProduct.save(callback);

}
