import React, {useContext} from 'react';
import projectContext from '../../context/projects/projectContext'; 
import taskContext from '../../context/tasks/taskContext';

const SingleProject = ({project}) => {
     // get state of projects
     const projectsContext = useContext(projectContext);
     const {actualProject} = projectsContext;

     // get function from taskContext
     const tasksContext = useContext(taskContext);
     const {getTasks} = tasksContext;
     
     // add actual project
     const selectProject = id => {
        actualProject(id);
        getTasks(id);
     }
    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => selectProject(project._id)}
            >
            {project.name}
            </button>
        </li>
     )
}

export default SingleProject;