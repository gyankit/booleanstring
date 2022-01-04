import React, { useState, useEffect } from 'react'

import Heading from '../components/heading'
import Notification from '../components/notification'
import BooleanStringItem from '../components/booleanStringItem'
import fetchApi from '../helper/fetch-api'

const Verify = () => {

    const [items, setItems] = useState([]);
    const [notice, setNotice] = useState({});
    const [loading, setLoading] = useState(true);

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
                setItems(res.data.booleanString);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }

    const refresh = () => {
        const request = {
            query: `query {
                booleanString {
                    _id, booleanString, slag, position, skill, location, state
                }
            }`
        };
        apiCall(request);
    }

    useEffect(() => {
        const request = {
            query: `query {
                booleanString {
                    _id, booleanString, slag, position, skill, location, state
                }
            }`
        };
        apiCall(request);
    }, []);

    return (
        <React.Fragment>
            <Heading heading="Verification Page" />
            <div className='container'>
                {
                    loading ?
                        <div className="lds-dual-ring"></div>
                        : <>
                            <Notification className={notice.error ? 'error' : 'success'} notice={notice.msg} />
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Sl No</th>
                                        <th>Boolean String</th>
                                        <th>Slag</th>
                                        <th>Position</th>
                                        <th>Skill</th>
                                        <th>Location</th>
                                        <th>State</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items.map((val, key) =>
                                            <BooleanStringItem key={key} value={val} idx={key} onChange={() => refresh()} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </>
                }
            </div>
        </React.Fragment>
    )
}

export default Verify
