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

router.post('/addCategory', (req, res, next) =>{
let newCategory = new Category({
  name: req.body.name,
  description: req.body.description

});

Category.addCategory(newCategory, (err, category)=>{
  if(err){
    throw err;
  }else{
    res.json({
      success: true, msg:"category added",
      categoryName: newCategory.name
      });
    }
})

});




module.exports = router;
