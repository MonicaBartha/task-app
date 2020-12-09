import {
    PROJECT_TASKS, 
    ADD_TASK, 
    VALIDATE_TASK,
    DELETE_TASK,
    ACTUAL_TASK,
    UPDATE_TASK,
    RESET_TASK
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                projectstasks: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                projectstasks: [action.payload, ...state.projectstasks ],
                errortask: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                errortask: true
            }
        case DELETE_TASK:
            return {
                ...state,
                projectstasks: state.projectstasks.filter(task => task._id !== action.payload )
            }
        case UPDATE_TASK:
            return {
                ...state,
                projectstasks: state.projectstasks.map(task => task._id === action.payload._id ? 
                action.payload : task)
            }
        case ACTUAL_TASK:
            return {
                ...state,
                selectedittask: action.payload
            }
        case RESET_TASK:
            return {
                ...state,
                selectedittask: null
            }
        default:
            return state;
    }
}