import React, { useState } from 'react'

const BooleanString = ({ val }) => {

    const [visible, setVisible] = useState(null);
    const [copy, setCopy] = useState(null);

    const copyToClipBoard = (data, id) => {
        navigator.clipboard.writeText(data);
        id === copy ? setCopy(null) : setCopy(id);
    }

    const openContentView = (id) => {
        id === visible ? setVisible(null) : setVisible(id);
    }

    return (
        <div className={`item ${visible === val._id && 'height'}`} onClick={(e) => openContentView(val._id)}>
            <div className='dropdown' >
                <div className='booleanString' onClick={(e) => copyToClipBoard(val.booleanString, val._id)}>{val.booleanString}</div>
                <div>
                    <button onClick={() => copyToClipBoard(val.booleanString, val._id)}>{copy === val._id ? 'Copied' : 'Copy'}</button>
                    <span className={`arrow ${visible === val._id ? 'down' : 'right'}`}></span>
                </div>
            </div>
            <div className={`content ${visible === val._id ? 'visible' : 'hidden'}`}>
                <hr></hr>
                <ul>
                    {
                        val.field.map((e, i) => {
                            return (<li key={i}>
                                <span>Field {i}</span>
                                <span>{e}</span>
                            </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default BooleanString
