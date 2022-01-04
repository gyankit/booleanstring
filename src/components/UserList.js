import React, { useEffect, useState } from 'react'

import Notification from './notification'
import UserItem from './userItem'
import fetchApi from '../helper/fetch-api'

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [notice, setNotice] = useState({});
    const [loading, setLoading] = useState(true);

    const apiCall = async (request) => {
        try {
            const res = await fetchApi(request);
            if (res.errors) {
                setNotice({
                    error: true,
                    msg: res.errors[0].message
                });
            }
            setUsers(res.data.user);
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
        apiCall(request);
    }

    useEffect(() => {
        const request = {
            query: `query {
                user {
                    _id, name, email, mobile, type, active
                }
            }`
        };
        apiCall(request);
    }, []);

    return (
        <div>
            {
                loading ?
                    <div className="lds-dual-ring"></div>
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
