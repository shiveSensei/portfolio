const router = require('express').Router();
const config = require('../config/database');
const co = require('co');

const Service = require('../models/service');

router.get('', (req, res, next)=>{

	Service.getServices(function(err, services){
		if(err){
			throw err;
		}else {
		res.json(services);}
	});

});

router.post('/addService', (req, res, next)=>{

	//create new service
	let newService = new Service({
		name: req.body.name,
		description: req.body.description,
		category: req.body.category
	});

	//save new service to db
	Service.addService(newService, (err, service)=>{
		if (err) {
			throw err;
		}else {
			res.json({success: true, msg: "Service added", serviceName: newService.name});
		}

	})



});
router.get('/getByCategory', (req, res, next)=>{



	Service.getByCategory(function(err, category){
		if(err){
			throw err;
		}else{
			res.json(category);
		}

	});



});

module.exports = router;
