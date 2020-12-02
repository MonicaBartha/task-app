const Project = require('../models/Project');
const {validationResult} = require('express-validator');

exports.createProject = async (req, res) => {
     // checking for errors
     const errors = validationResult(req);
     if( !errors.isEmpty() ) {
         return res.status(400).json({errors: errors.array() })
     }

    try {
        // Create a new project
        const project = new Project(req.body);
        // Save the author with JWT
        project.author = req.user.id;

        // Save the project
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('It is an error')
    }
}

// Get all projects of a logged in user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ author: req.user.id }).sort({created: -1 });
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error was found.');
    }
}

// update project
exports.updateProject = async(req, res) => {
    // checking for errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    // extract project info
    const {name} = req.body;
    const newProject = {};

    if(name) {
    newProject.name = name;
    }

    try {
        // check the ID
        let project = await Project.findById(req.params.id);
        
        // if project exist or not
        if( !project ) {
            return res.status(404).json({msg: 'Project not founded.'})
        }
        // verify project author
        if( project.author.toString() !== req.user.id ) {
            return res.status(401).json({msg: 'Not Authorized'})
        }
        // update
        project = await Project.findByIdAndUpdate({_id: req.params.id }, 
            {$set: newProject}, {new: true});

            res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');   
    }
}

// delete a project by ID
exports.deleteProject = async (req, res) => {
try {
    // check the ID
    let project = await Project.findById(req.params.id);
            
    // if project exist or not
    if( !project ) {
        return res.status(404).json({msg: 'Project not founded.'})
        }
    // verify project author
    if( project.author.toString() !== req.user.id ) {
        return res.status(401).json({msg: 'Not Authorized'})
        }
    // delete project 
    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Project deleted'})
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error.')
    }
}
