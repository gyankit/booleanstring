import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../helper/context'
import Heading from '../components/heading'
import Notification from '../components/notification'
import BooleanStringItem from '../components/booleanStringItem'
import fetchApi from '../helper/fetch-api'

const Verify = () => {

    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [notice, setNotice] = useState({});
    const [loading, setLoading] = useState(true);

    const apiCall = async (request, token) => {
        try {
            const res = await fetchApi(request, token);
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
                setItems([]);
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
                    _id, booleanString, field, state
                }
            }`
        };
        apiCall(request);
    }

    useEffect(() => {
        const type = context.getUser('type');
        if (type === '1' || type === '0' || type === '2') {
            const request = {
                query: `query {
                    booleanString {
                        _id, booleanString, field, state
                    }
                }`
            };
            apiCall(request, context.getUser('token'));
        } else {
            navigate('/');
        }
    }, [context, navigate]);

    const showError = () => {
        setNotice({
            error: true,
            msg: "Unauthorized Access"
        });
    }

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
                                        <th>Field</th>
                                        {
                                            context.getUser('type') !== '2' && <>
                                                <th>State</th>
                                                <th>Delete</th>
                                            </>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items.map((val, key) =>
                                            <BooleanStringItem key={key} value={val} idx={key} onChange={() => refresh()} showError={showError} />
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
