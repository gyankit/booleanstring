import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import AuthContext from '../helper/context'

const Header = (props) => {

    const location = useLocation();
    const context = useContext(AuthContext);

    return (
        <header className='header'>
            <div className='header-main'>
                <h2 className='title'>Boolean String</h2>
            </div>
            <nav className='header-navbar'>
                <ul>
                    {
                        location.pathname === '/' &&
                        <li>
                            <button onClick={props.search}>&#128269;</button>
                        </li>
                    }
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {
                        context.isLoggedIn() ?
                            <>
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/data-entry">Data Entry</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/verification">Verification</NavLink>
                                </li>
                                {
                                    (context.getUser('type') === '1' || context.getUser('type') === '0') &&
                                    <li>
                                        <NavLink to="/user">User</NavLink>
                                    </li>
                                }
                                <li>
                                    <button onClick={props.logout}>Logout</button>
                                </li>
                            </>
                            :
                            <li>
                                <NavLink to="/authentication">Login</NavLink>
                            </li>
                    }
                </ul>
            </nav>
        </header >
    )
}

export default Header

