import React, {Fragment, useState, useContext} from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {
    // get state from New Project form
    const projectsContext = useContext(projectContext);
    const {form, formerror, showForm, addProject, showError} = projectsContext;

    const [ project, setProject ] = useState({
        name: '',
    });

    const { name } = project;

    // reads input content
    const onChangeProject = e => {
        setProject({
            ...project,
            // assign the new values
            [e.target.name] : e.target.value
        });
    }
    // when user add a project
    const onSubmitProject = e => {
        e.preventDefault();
        // validation
        if (name === '') {
            showError();
            return;
        }
        // add to state (projectState.js)
        addProject(project);
        // form reinitiate
        setProject({
            name: ''
        })
    }
    
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primary"
                onClick={ () => showForm() }
            >
                Start a New Project
            </button>
           {
               form ? (
                <form 
                    className="new-project-form"
                    onSubmit={onSubmitProject}
                    >
                <input
                    type="text"
                    className="input-text"
                    placeholder="Project Name"
                    name="name"
                    value={name}
                    onChange={onChangeProject}
                />
                <input
                    type="submit"
                    className="btn btn-primary btn-block"
                    value="Add Project"
                    />
            </form>
               )
               : null
           }
           { formerror ? <p className="message error">Project Name is required.</p> : null}
        </Fragment>
    )
}

export default NewProject;
