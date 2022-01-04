import React from 'react'

const Notification = (props) => {
    return (
        <React.Fragment>
            {
                props.notice !== undefined ?
                    <div className={props.className}>{props.notice}</div>
                    : ''
            }
        </React.Fragment>
    )
}

export default Notification

