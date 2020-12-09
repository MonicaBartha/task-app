import React, {useContext, useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '../../context/autentification/authContext';

// higher order component
const PrivateRoute = ({component: Component, ...props}) => {

    const authContext = useContext(AuthContext);
    const {loading, authenticated, loggedinUser} = authContext;

    useEffect(() => {
        loggedinUser();
    // eslint-disable-next-line
    }, [])

    return (
        <Route {...props} 
        render={props => !authenticated && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component {...props} />
        ) }
        />
    );
}

export default PrivateRoute;


