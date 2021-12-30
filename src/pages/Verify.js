import React, { useState, useEffect } from 'react'

import Heading from '../components/Heading'
import Error from '../components/Error'
import BooleanStringItem from '../components/BooleanStringItem'
import api from '../helper/api.json'

const Verify = () => {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = {
            query: `query {
                booleanString {
                    _id, booleanString, slag, position, skill, location, state
                }
            }`
        };
        fetch(api.url, {
            method: api.method,
            headers: api.headers,
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(result => {
                setLoading(false);
                if (result.errors) {
                    setError(result.errors[0].message);
                }
                setItems(result.data.booleanString);
            })
            .catch(err => console.log(err));
    }, [loading]);

    return (
        <React.Fragment>
            <Heading heading="Verification Page" />
            <div className='container'>
                {
                    loading ?
                        <div className="lds-dual-ring"></div>
                        :
                        error ?
                            <Error error={error} />
                            :
                            items.length === 0 ?
                                <Error error={"No Data Available"} />
                                :
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
                                                <BooleanStringItem key={key} value={val} idx={key} onChange={() => setLoading(true)} />
                                            )
                                        }
                                    </tbody>
                                </table>
                }
            </div>
        </React.Fragment>
    )
}

export default Verify
