import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../helper/context'
import Heading from '../components/heading'
import Register from '../components/register'
import UserList from '../components/userList'

const User = () => {

    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [view, setView] = useState(true);

    useEffect(() => {
        const type = context.getUser('type');
        if (type === '1' || type === '0') { } else {
            navigate('/');
        }
    }, [context, navigate]);

    return (
        <React.Fragment>
            <Heading heading="User Page" />
            <div className='switch'>
                <button className='button button-default' onClick={() => setView(!view)}>{view ? 'Add User' : 'View User'}</button>
            </div>
            <div className='container'>
                {
                    view ? <UserList /> : <Register onChange={() => setView(true)} />
                }
            </div>
        </React.Fragment>
    )
}

export default User
