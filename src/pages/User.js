import React, { useState } from 'react'

import Heading from '../components/heading'
import Register from '../components/register'
import UserList from '../components/userList'

const User = () => {

    const [view, setView] = useState(true);

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
