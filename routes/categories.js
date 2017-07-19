const router = require('express').Router();
const config = require('../config/database');
const co = require('co');


const Category = require('../models/category');

router.get('', (req, res, next)=>{

	Category.getCategories(function(err, categories){
		if(err){
			throw err;
		}
		res.json(categories);
	});

});

module.exports = router;
