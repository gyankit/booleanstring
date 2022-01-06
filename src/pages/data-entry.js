import React, { useState } from 'react'

import Heading from '../components/heading'
import Notification from '../components/notification'
import fetchApi from '../helper/fetch-api'

const DataEntry = () => {

    const [notice, setNotice] = useState({});
    const [preview, setPreview] = useState('');
    const [fields, setFields] = useState([{ data: '' }]);

    const formSubmit = async (e) => {
        e.preventDefault();
        if (preview !== '') {
            const request = {
                query: ` mutation {
                    createBooleanString(stringInput: { 
                        booleanString: ${JSON.stringify(preview)},
                        field: ${JSON.stringify(fields.map(e => `${e.data}`))}
                    }) {
                        _id, booleanString
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
                    setNotice({
                        error: false,
                        msg: 'Data Uploaded Successfully! Check with Administrator for Verification'
                    });
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            setNotice({
                error: true,
                msg: 'Check Preview First!'
            });
        }
    }

    const createPreview = () => {
        setNotice({});
        if (fields[0].data !== '') {
            const booleanString = fields.map(elm => {
                return (
                    `(${elm.data.split(',').map(e => {
                        return (`"${e.trim()}"`)
                    }).join(' OR ')})`
                )
            }).join(' AND ');
            setPreview(booleanString);
        } else {
            setPreview('');
        }
    }

    const handleChange = (i, e) => {
        let newValues = [...fields];
        newValues[i][e.target.name] = e.target.value.toUpperCase();
        setFields(newValues);
    }

    const addFormFields = () => {
        setFields([...fields, { data: '' }]);
    }

    const removeFormFields = (i) => {
        let newValues = [...fields];
        newValues.splice(i, 1);
        setFields(newValues);
    }

    return (
        <React.Fragment>
            <Heading heading="Data Entry Page" />
            <div className='container'>
                <Notification className={notice.error ? 'error' : 'success'} notice={notice.msg} />
                <form className='form' onSubmit={formSubmit}>
                    <div className='form-control'>
                        <label htmlFor='preview'>Preview Boolean String</label>
                        <input type="text" value={preview} readOnly={true} />
                    </div>
                    <div className='form-control'>
                        <label htmlFor='field'>Field</label>
                        {
                            fields.map((elm, idx) => {
                                return (
                                    <div className='data-entry' key={idx}>
                                        <div className='data-entry-input'>
                                            <textarea name='data' rows={5} value={elm.data} onChange={(e) => handleChange(idx, e)} required></textarea>
                                        </div>
                                        <div className='data-entry-button'>
                                            {
                                                fields.length !== 1 && <button className='button button-red' onClick={() => removeFormFields(idx)} type='button'>Remove Field</button>
                                            }
                                            {
                                                fields.length - 1 === idx && <button className='button button-green' onClick={addFormFields} type='button'>Add Field</button>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='form-control'>
                        <button className='button button-default' type='button' onClick={createPreview}>Preview</button>
                        <button className='button button-green' type='submit' >Submit</button>
                    </div>
                </form>
            </div >
        </React.Fragment >
    )
}

export default DataEntry
