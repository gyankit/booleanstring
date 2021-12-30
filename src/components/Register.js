import React, { useState } from 'react'

import api from '../helper/api.json'

const Register = (props) => {

    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const formSubmit = (e) => {
        e.preventDefault();
        if (password === cpassword) {
            const request = {
                query: `mutation {
                    createUser(userInput: { name: "${name}", email: "${email}", mobile: "${mobile}", password: "${password}" }) {
                        _id, name
                    }
                }`
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
                        props.onChange();
                    }
                })
                .catch(err => console.log(err));
        } else {
            setError('Password not Matching')
        }
    }

    return (
        <div className='login user'>
            <h3 className='title'>Add User</h3>
            <hr />
            {
                error ?
                    <div className='error'>{error}</div>
                    : ''
            }
            <form className='form' onSubmit={formSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Full Name</label>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className='form-control'>
                    <label htmlFor='mobile'>Mobile</label>
                    <input type='text' value={mobile} onChange={e => setMobile(e.target.value)} required />
                </div>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className='form-control'>
                    <label htmlFor='cpassword'>Confirm Password</label>
                    <input type='text' value={cpassword} onChange={e => setCPassword(e.target.value)} required />
                </div>
                <div>
                    <button className='button button-green' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register
