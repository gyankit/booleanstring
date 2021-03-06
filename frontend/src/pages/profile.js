import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Heading from '../components/heading'
import Notification from '../components/notification'
import Error from '../components/error'
import fetchApi from '../helper/fetch-api'
import AuthContext from '../helper/context'

const Profile = () => {

    const passRef = useRef('');
    const cpassRef = useRef('');
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notice, setNotice] = useState({});
    const [error, setError] = useState(null);

    const apiCall = async (request, token, update = false) => {
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
                if (update) {
                    setUser(res.data.updateUser);
                    setNotice({
                        error: false,
                        msg: 'Profile Updated!'
                    });
                } else {
                    setUser(res.data.user[0]);
                }
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const userId = context.getUser('_id');
        if (userId === undefined) {
            navigate('/');
        } else {
            const request = {
                query: `query {
                    user(_id: "${userId}") {
                        _id, name, email, mobile
                    }
                }`
            };
            apiCall(request, context.getUser('token'));
        }
    }, [context, navigate]);


    const formSubmit = (e) => {
        e.preventDefault();

        if (passRef.current.value !== '') {
            if (passRef.current.value !== cpassRef.current.value) {
                setNotice({
                    error: true,
                    msg: 'Password Not Matching!'
                });
            } else {
                const request = {
                    query: `mutation {
                        updateUser(_id: "${user._id}", update: { name: "${user.name}", email: "${user.email}", mobile: "${user.mobile}", password: "${passRef.current.value}" }) {
                            _id, name, email, mobile
                        }
                    }`
                }
                apiCall(request, true);
            }
        } else {
            const request = {
                query: `mutation {
                    updateUser(_id: "${user._id}", update: { name: "${user.name}", email: "${user.email}", mobile: "${user.mobile}"}) {
                        _id, name, email, mobile
                    }
                }`
            }
            apiCall(request, true);
        }
    }

    return (
        <React.Fragment>
            <Heading heading="Profile Page" />
            <div className='container'>
                {
                    loading ?
                        <div className="lds-dual-ring"></div>
                        :
                        error !== null ?
                            <Error error={error} />
                            :
                            <>
                                <Notification className={notice.error ? 'error' : 'success'} notice={notice.msg} />
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
                                        <input type='password' ref={passRef} />
                                    </div>
                                    <div className='form-control'>
                                        <label htmlFor='cpassword'>Confirm Password</label>
                                        <input type='text' ref={cpassRef} />
                                    </div>
                                    <div>
                                        <button className='button button-green' type='submit'>Update</button>
                                    </div>
                                </form>
                            </>
                }
            </div>
        </React.Fragment >
    )
}

export default Profile
