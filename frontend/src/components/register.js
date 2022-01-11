import React, { useState, useRef, useContext } from 'react'

import Notification from './notification'
import fetchApi from '../helper/fetch-api'
import AuthContext from '../helper/context'

const Register = (props) => {

    const nameRef = useRef(undefined);
    const mobileRef = useRef(undefined);
    const emailRef = useRef(undefined);
    const passwordRef = useRef(undefined);
    const cpasswordRef = useRef(undefined);
    const context = useContext(AuthContext);
    const [notice, setNotice] = useState({});

    const formSubmit = async (e) => {
        e.preventDefault();
        if (passwordRef.current.value === cpasswordRef.current.value) {
            const request = {
                query: `mutation {
                    createUser(userInput: { name: "${nameRef.current.value}", email: "${emailRef.current.value}", mobile: "${mobileRef.current.value}", password: "${passwordRef.current.value}" }) {
                        _id
                    }
                }`
            }
            try {
                const res = await fetchApi(request, context.getUser('token'));
                if (res.errors) {
                    if (res.errors[0].message === '401') {
                        setNotice({
                            error: true,
                            msg: "Unauthorized Access"
                        })
                    } else {
                        setNotice({
                            error: true,
                            msg: res.errors[0].message
                        });
                    }
                } else {
                    props.onChange();
                }
            } catch (err) {
                console.error(err)
            }
        } else {
            setNotice()
            setNotice({
                error: true,
                msg: 'Password not Matching'
            });
        }
    }

    return (
        <div className='login user'>
            <h3 className='title'>Add User</h3>
            <hr />
            <Notification className={notice.error ? 'error' : 'success'} notice={notice.msg} />
            <form className='form' onSubmit={formSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Full Name</label>
                    <input type='text' ref={nameRef} required />
                </div>
                <div className='form-control'>
                    <label htmlFor='mobile'>Mobile</label>
                    <input type='text' ref={mobileRef} required />
                </div>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' ref={emailRef} required />
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' ref={passwordRef} required />
                </div>
                <div className='form-control'>
                    <label htmlFor='cpassword'>Confirm Password</label>
                    <input type='text' ref={cpasswordRef} required />
                </div>
                <div>
                    <button className='button button-green' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register
