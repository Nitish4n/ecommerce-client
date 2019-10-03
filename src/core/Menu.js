import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout, isAuthenticated } from '../auth'


const isActive = (history, path ) => {
    if(history.location.pathname === path){
        return {color: '#ff9900'}
    }else{
        return { color :'#ffffff'}
    }
}

const Menu = ({history}) => (
    <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
            <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
        </li>

        {!isAuthenticated() && (
            <Fragment>
                <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Sign In</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Sign Up</Link>
            </li>
            </Fragment>
        )}
        
        {isAuthenticated() && (
            <Fragment>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/signup')} to="/dashboard">Dashboard</Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" style={{cursor: "pointer", color: "#fff"}}  onClick={() => logout(() => {
                    history.push("/")
                })} >Sign Out</Link>
            </li>
            </Fragment>
        )}
        
    </ul>
)

export default withRouter(Menu);