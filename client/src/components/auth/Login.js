import React, {Fragment, useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/autentification/authContext';

const Login = (props) => {
    // get values from context
    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, userLogin } = authContext;

    // if the password or user no exist or is incorrect 
    useEffect(()=> {
        if(authenticated) {
            props.history.push('/projects')
        }
        if(message) {
            showAlert(message.msg, message.category);
        }
        // eslint-disable-next-line
    }, [message, authenticated, props.history])

    // Login state
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    })
    const {email, password } = user;
    
    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        // check for empty fields
        if( email.trim() === '' || password.trim() === '') {
            showAlert('All fields are required.', 'alert-error')
        }
        // go to action (function of reducer)
        userLogin({email, password})
    }

    return (
        <Fragment>
        <h1 className="home-title">Project & Task Manager</h1>
        <div className="user-form">
             {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) 
            : null}
            <div className="container-form dark-shadow">
                <h2>Sign In</h2>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="form-field">
                        <label htmlFor="email"><i class="fas fa-envelope"></i></label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password"><i class="fas fa-key"></i></label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-field">
                        <input type="submit" className="btn btn-primary btn-block"
                        value="Access your account" />
                    </div>
                </form>
                <p>Dont't have an account?</p> 
                <Link to="/new-account" className="get-account" >Sign Up Now</Link>
            </div>
        </div>
        </Fragment>
     )
}

export default Login;