import React, {useContext} from 'react';
import taskContext from '../../context/tasks/taskContext';
import projectContext from '../../context/projects/projectContext';

const Task = ({task}) => {

    // get state and functions function from taskState
    const tasksContext = useContext(taskContext);
    const {deleteTask, getTasks, updateTask, editActualTask} = tasksContext;

    // extract if a project is active
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    // array destructuring to get the actual project
    const [actualProject] = project;

    const onClickDeleteTask = id => {
        deleteTask(id, actualProject._id);
        getTasks(actualProject.id);
    }

    // modify task state
    const changeState = task => {
        if(task.state) {
            task.state = false;
        } else {
            task.state = true;
        }
        updateTask(task);
    }
    // selected the task to edit 
    const selectEditedTask = task => {
        editActualTask(task);
    }
    return (
        <li className="task shadow">
            <p>{task.name}</p>
            <div className="state">
                {task.state ? 
                    (
                        <button type="button" 
                        className="complete"
                        onClick={() => changeState(task)} >Completed</button>
                    )
                :
                    (
                        <button type="button" 
                        className="incomplete"
                        onClick={() => changeState(task)} >Incomplete</button>
                    )
                }
            </div>
            <div className="actions">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={ () => {selectEditedTask(task)}}
                >
                    Edit
                </button>
                <button
                    type="button"
                    className="btn btn-secundary"
                    onClick={ () => onClickDeleteTask(task._id)}
                >
                    Delete
                </button>
            </div>
        </li>
    )
}

export default Task;
