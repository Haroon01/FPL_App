import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

function ProtectedRoute({ children, ...rest }) {
    const navigate = useNavigate();
    // Get the cookie from browser...
    const isAuth = localStorage.getItem('fplreloaded_login');

    if (!isAuth){
        navigate('/login');
    }

    return (
        <Route {...rest}>
            {isAuth ? children : null}
        </Route>
    )
}

export default ProtectedRoute;