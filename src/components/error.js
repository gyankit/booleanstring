import React from 'react'

const Error = (props) => {
    return (
        <div>
            {
                props.error.code === '401' &&
                <div>
                    {props.error.message}
                </div>
            }
        </div>
    )
}

export default Error
