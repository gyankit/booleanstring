import React, { useState, useEffect } from 'react'

import Notification from '../components/notification'
import BooleanString from '../components/booleanString'
import fetchApi from '../helper/fetch-api'

const Home = (props) => {

    const [items, setItems] = useState([]);
    const [notice, setNotice] = useState({});
    const [loading, setLoading] = useState(true);
    const [fields, setFields] = useState([{ data: '' }]);
    const [datas, setDatas] = useState([{ data: '' }]);


    const apiCall = async (request) => {
        try {
            const res = await fetchApi(request);
            if (res.errors) {
                setNotice({
                    error: true,
                    msg: res.errors[0].message
                });
            } else if (res.data.booleanString.length === 0) {
                setNotice({
                    error: true,
                    msg: "No Data Available"
                });
            } else {
                setDatas(res.data.booleanString);
                setItems(res.data.booleanString);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const request = {
            query: `query {
                booleanString(state: ${true}) {
                    _id, booleanString, field
                }
            }`
        };
        apiCall(request);
    }, []);

    const handleChange = (i, e) => {
        let newValues = [...fields];
        newValues[i][e.target.name] = e.target.value.toUpperCase();
        setFields(newValues);

        const newData = newValues.map(x => {
            let searchString = []
            datas.map(e => {
                if (e.booleanString.search(x.data) >= 0) {
                    searchString = [...searchString, e]
                }
                return searchString
            })
            return searchString
        })

        setItems(newData[0])
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
        <div className='home'>
            <div className='container'>
                {
                    loading ?
                        <div className="lds-dual-ring"></div>
                        :
                        notice.error ?
                            <Notification className={'error'} notice={notice.msg} />
                            : <>
                                {
                                    props.search &&
                                    <div className='searchform'>
                                        {
                                            fields.map((elm, idx) => {
                                                return (
                                                    <div className='search' key={idx}>
                                                        <div className='search-input'>
                                                            <input placeholder='Search Your Boolean String ...' name='data' value={elm.data} onChange={(e) => handleChange(idx, e)} />
                                                        </div>
                                                        <div className='search-button'>
                                                            {
                                                                fields.length !== 1 && <button className='button button-red' onClick={() => removeFormFields(idx)} type='button'>Remove Search Field</button>
                                                            }
                                                            {
                                                                fields.length - 1 === idx && <button className='button button-green' onClick={addFormFields} type='button'>Add Search Field</button>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                                <div className='list'>
                                    {
                                        items.map((val, key) =>
                                            <BooleanString key={key} val={val} />
                                        )
                                    }
                                </div>
                            </>
                }
            </div>
        </div>
    )
}

export default Home

