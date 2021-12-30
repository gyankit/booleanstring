import React, { useState } from 'react'

import Error from '../components/Error'
import api from '../helper/api.json'

const Auth = () => {

    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formSubmit = (e) => {
        e.preventDefault();
        setError(null);
        let request = {
            query: `query { 
            login ( email: "${email}", password: "${password}") {
                id, type, token, tokenExpire
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
                } else {
                    console.log(result.data.login)
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='container'>
            <div className='login'>
                <h3 className='title'>Sign In</h3>
                <hr />
                <Error error={error} />
                <form className='form' onSubmit={formSubmit}>
                    <div className='form-control'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
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
