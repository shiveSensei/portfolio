const mongoose = require('mongoose');
const config = require('../config/database');
const co = require('co');
const Schema = require('mongoose').Schema;
const Services = require('../models/service');
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
	client: {
		type: String,

	},
	service: {
		type: [Schema.Types.ObjectId],
		ref:'Services'
	}
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);

//---------------------FUNCTIONS

//Get Projects
module.exports.getProjects = function (callback){
	Project.find(callback);
}


//Add Project to db
module.exports.addProject = function (newProject, callback) {
	newProject.save(callback);

}
