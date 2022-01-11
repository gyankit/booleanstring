import React, { useState, useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import Notification from '../components/notification'
import AuthContext from '../helper/context'
import fetchApi from '../helper/fetch-api'

const Login = (props) => {

    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [notice, setNotice] = useState(undefined);
    const emailRef = useRef(undefined);
    const passwordRef = useRef(undefined);

    const formSubmit = async (e) => {
        e.preventDefault();
        setNotice(undefined);
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
                setNotice(res.errors[0].message);
            } else {
                props.login(res.data.login);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (context.isLoggedIn()) {
            navigate('/');
        }
    }, [context, navigate]);

    return (
        <div className='container'>
            <div className='login'>
                <h3 className='title'>Sign In</h3>
                <hr />
                <Notification className={'error'} notice={notice} />
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

export default Login
