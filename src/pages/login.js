import React, { useState, useRef } from 'react'

import Notification from '../components/notification'
import fetchApi from '../helper/fetch-api'

const Auth = () => {

    const [notice, setNotice] = useState({});
    const emailRef = useRef(undefined);
    const passwordRef = useRef(undefined);

    const formSubmit = async (e) => {
        e.preventDefault();
        setNotice(null);
        const request = {
            query: `query { 
                login ( email: "${emailRef.current.value}", password: "${passwordRef.current.value}") {
                    _id, type, token, tokenExpire
                }
            }`
        };
        try {
            const res = await fetchApi(request);
            if (res.errors) {
                setNotice({
                    error: true,
                    msg: res.errors[0].message
                });
            } else {
                console.log(res.data.login)
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='container'>
            <div className='login'>
                <h3 className='title'>Sign In</h3>
                <hr />
                <Notification className={'error'} notice={notice.msg} />
                <form className='form' onSubmit={formSubmit}>
                    <div className='form-control'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' ref={emailRef} required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' ref={passwordRef} required />
                    </div>
                    <div className='login-action'>
                        <button className='button button-green' type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}



export default Auth
