const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

// Create projects
// api/projects
router.post('/', 
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectController.createProject
);

// get all projects
router.get('/',
    auth,
    projectController.getProjects
);

// update a project via ID
router.put('/:id',
auth,
[
    check('name', 'Project name is required').not().isEmpty()
],
projectController.updateProject
);

// Delete Projects
router.delete('/:id', 
    auth,
    projectController.deleteProject
);

module.exports = router;