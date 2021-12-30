import React, { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import Error from '../components/Error'
import api from '../helper/api.json'

const Profile = () => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState('');
    const userId = "61cd3605ff4a31bba8088f7e";

    useEffect(() => {
        const request = {
            query: `query {
                user(id: "${userId}") {
                    _id, name, email, mobile, password
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
                if (result.errors) {
                    setError(result.errors[0].message);
                }
                setUser({ ...result.data.user[0], password: '' });
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, [loading]);


    const formSubmit = (e) => {
        e.preventDefault();
        let request = {
            query: `mutation {
                updateUser(id: "${userId}", update: { name: "${user.name}", email: "${user.email}", mobile: "${user.mobile}" }) {
                    _id
                }
            }`
        }
        if (user.password === password && user.password !== '') {
            request = {
                query: `mutation {
                    updateUser(id: "${userId}", update: { name: "${user.name}", email: "${user.email}", mobile: "${user.mobile}", password: "${user.password}" }) {
                        _id
                    }
                }`
            }
        }
        fetch(api.url, {
            method: api.method,
            headers: api.headers,
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(result => {
                if (result.errors) {
                    setError(result.errors[0].message);
                } else {
                    setLoading(true);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <React.Fragment>
            <Heading heading="Profile Page" />
            <div className='container'>
                {
                    loading ?
                        <div className="lds-dual-ring"></div>
                        :
                        error ?
                            <Error error={error} />
                            :
                            <form className='form profile' onSubmit={formSubmit}>
                                <div className='form-control'>
                                    <label htmlFor='id'>ID</label>
                                    <input type='text' value={user._id} required readOnly={true} />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='name'>Full Name</label>
                                    <input type='text' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} required />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='mobile'>Mobile</label>
                                    <input type='text' value={user.mobile} onChange={(e) => setUser({ ...user, mobile: e.target.value })} required />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='email'>Email</label>
                                    <input type='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='password'>Password</label>
                                    <input type='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                                </div>
                                <div className='form-control'>
                                    <label htmlFor='cpassword'>Confirm Password</label>
                                    <input type='text' value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div>
                                    <button className='button button-green' type='submit'>Update</button>
                                </div>
                            </form>
                }
            </div>
        </React.Fragment>
    )
}

export default Profile
