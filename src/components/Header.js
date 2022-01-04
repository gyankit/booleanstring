import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className='header'>
            <div className='header-main'>
                <h2 className='title'>Boolean String</h2>
            </div>
            <nav className='header-navbar'>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile">Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/data-entry">Data Entry</NavLink>
                    </li>
                    <li>
                        <NavLink to="/verification">Verification</NavLink>
                    </li>
                    <li>
                        <NavLink to="/user">User</NavLink>
                    </li>
                    <li>
                        <NavLink to="/authentication">Login</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header

