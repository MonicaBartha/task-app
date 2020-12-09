import React, {useReducer} from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import {
    PROJECT_FORM, 
    GET_PROJECTS, 
    ADD_PROJECT, 
    ERROR_PROJECT,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT } from '../../types';
import axiosClient from '../../config/axios';


const ProjectState = props => {
    
    const initialState = {
        projects: [],
        form: false,
        formerror: false,
        project: null,
        message: null
    }
    // dispatch for actions execute
    const [ state, dispatch ] = useReducer( projectReducer, initialState) 

    // Functions for CRUD
    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    // get projects
    const getProjects = async () => {
        try {
            const result = await axiosClient.get('/api/projects')
            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'Error was found',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }
    }

    // add new project
    const addProject = async project => {
       
       try {
        const result = await axiosClient.post('/api/projects', project);
        // add project to the state
        dispatch({
            type: ADD_PROJECT,
            payload: result.data
        })
           
       } catch (error) {
            const alert = {
                msg: 'Error was found',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
       }
    }

    // validate new project form
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }
    // select project that user is clicking
    const actualProject = projectId => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }
    // delete project
    const deleteProject = async projectId => {
       try {
           await axiosClient.delete(`/api/projects/${projectId}`);
           dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        })
       } catch (error) {
           const alert = {
               msg: 'Error was found',
               category: 'alert-error'
           }
           dispatch({
               type: ERROR_PROJECT,
               payload: alert
           })
       }
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                formerror: state.formerror,
                project: state.project,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                actualProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}
export default ProjectState;