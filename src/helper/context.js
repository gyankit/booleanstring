import React from 'react'

export default React.createContext({
    user: {
        id: String,
        token: String,
        type: String,
        expire: String,
        loginTime: String,
    },
    getUser: (key) => { },
    isLoggedIn: () => { }
})
