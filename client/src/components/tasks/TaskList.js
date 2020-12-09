import React, {Fragment, useContext} from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const TaskList = () => {
    // extract projects from initial state (projectState.js)
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    // get project tasks
    const tasksContext = useContext(taskContext);
    const {projectstasks} = tasksContext;

    // if is no selected project
    if(!project) return <h2>Select a project</h2>;

    // array destructuring to get the actual project
    const [actualProject] = project;

    // delete a project
    const onClickDelete = () => {
      deleteProject(actualProject._id)
    }

    return(
        <Fragment>
            <h2>Project: {actualProject.name}</h2>
            <ul className="task-list">
              { projectstasks.length === 0 
                ? ( <li className="task"> <p>No tasks</p> </li> )
                : 
                <TransitionGroup>
                  {projectstasks.map(task => ( 
                    <CSSTransition 
                      key={task._id}
                      timeout={200}
                      classNames="task" >
                        <Task
                        task={task}
                        />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              }
            </ul>
            <button 
                type="button"
                className="btn btn-delete"
                onClick={onClickDelete}
                >Delete Project &times;
              </button>
        </Fragment>
        
    )
}

export default TaskList;
