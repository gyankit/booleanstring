import React from 'react'

const Error = ({ error }) => {
    return (
        <React.Fragment>
            {
                error ?
                    <div className='error'>{error}</div>
                    : ''
            }
        </React.Fragment>
    )
}

export default Error

