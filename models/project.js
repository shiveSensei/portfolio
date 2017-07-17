const mongoose = require('mongoose');
const config = require('../config/database');
const co = require('co');
//Service Schema




const ProjectSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	servicesRendered: {
		type: String
	}
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);

//---------------------FUNCTIONS

//Get Projects
module.exports.getServices = function (callback){
	Project.find(callback);
}
//Get Projects by category

//Add Project to db
module.exports.addService = function (newProduct, callback) {
	newProduct.save(callback);

}