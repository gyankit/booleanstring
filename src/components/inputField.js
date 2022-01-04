import React, { useRef } from 'react'

const InputField = ({ elm, onChange }) => {

    const nameRef = useRef(undefined);
    const conRef = useRef(undefined);

    return (
        <div className='form-control'>
            <label htmlFor="field">Field</label>
            <input type="text" ref={nameRef} required />
            <select value={elm.con} ref={conRef} onChange={() => onChange(nameRef.current.value, conRef.current.value)}>
                <option value="">Select Option</option>
                <option value="YES">YES</option>
                <option value="NO">NO</option>
            </select>
        </div>
    )
}

export default InputField
