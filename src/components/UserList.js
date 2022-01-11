import React, { useEffect, useState, useContext } from 'react'

import Notification from './notification'
import Error from './error'
import UserItem from './userItem'
import fetchApi from '../helper/fetch-api'
import AuthContext from '../helper/context'

const UserList = () => {

    const context = useContext(AuthContext);

    const [users, setUsers] = useState([]);
    const [notice, setNotice] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiCall = async (request, token) => {
        try {
            const res = await fetchApi(request, token);
            if (res.errors) {
                if (res.errors[0].message === '401') {
                    setError({
                        code: res.errors[0].message,
                        message: "Unauthorized Access"
                    })
                }
                setNotice({
                    error: true,
                    msg: res.errors[0].message
                });
            } else {
                setUsers(res.data.user);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    const refresh = () => {
        const request = {
            query: `query {
                user {
                    _id, name, email, mobile, type, active
                }
            }`
        };
        apiCall(request, context.getUser('token'));
    }

    useEffect(() => {
        const request = {
            query: `query {
                user {
                    _id, name, email, mobile, type, active
                }
            }`
        };
        apiCall(request, context.getUser('token'));
    }, [context]);

    return (
        <div>
            {
                loading ?
                    <div className="lds-dual-ring"></div>
                    : error !== null ?
                        <Error error={error} />
                        : <>
                            <Notification className={notice.error ? 'error' : 'success'} notice={notice.msg} />
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Sl No</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Active</th>
                                        <th>Type</th>
                                        <th>Update Type</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map((val, key) =>
                                            <UserItem key={key} value={val} idx={key} onChange={() => refresh()} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </>
            }
        </div>
    )
}

export default UserList
