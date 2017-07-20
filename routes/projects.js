const router = require('express').Router();
const config = require('../config/database');
const co = require('co');

const Project = require('../models/project');

router.get('',(req, res, next)=>{

  Project.getProjects(function(err, projects){
    if(err){
      throw err;

    }else{
      res.json(projects);}

  });

});

router.post('/addProject',(req, res, next)=>{

  //create new project
  let newProject = new Project({
    name: req.body.name,
    description: req.body.description,
    client: req.body.client,
    service: req.body.service
  });

  // save new project
  Project.addProject(newProject, (err, project)=>{
    if (err){
      throw err;
    }else{

      res.json({success: true, msg:"project added", projectName: newProject.name});
    }
  })

});

module.exports = router;
