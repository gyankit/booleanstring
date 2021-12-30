import React, { useEffect, useState } from 'react'

import Error from './Error'
import UserItem from './UserItem'
import api from '../helper/api.json'

const UserList = () => {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = {
            query: `query {
                user {
                    _id, name, email, mobile, type, active
                }
            }`
        };
        fetch(api.url, {
            method: api.method,
            headers: api.headers,
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(result => {
                setLoading(false);
                if (result.errors) {
                    setError(result.errors[0].message);
                }
                setItems(result.data.user);
            })
            .catch(err => console.log(err));
    }, [loading]);

    return (
        <div>
            {
                loading ?
                    <div className="lds-dual-ring"></div>
                    :
                    error ?
                        <Error error={error} />
                        :
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
                                    items.map((val, key) =>
                                        <UserItem key={key} value={val} idx={key} onChange={() => setLoading(true)} />
                                    )
                                }
                            </tbody>
                        </table>
            }
        </div>
    )
}

export default UserList
