import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Error from '../components/Error'
import api from '../helper/api.json'

const Home = () => {

    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = {
            query: `query {
                booleanString(state: ${true}) {
                    booleanString, slag
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
        <div className='home'>
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
                                <div className='list'>
                                    {
                                        items.map((val, key) =>
                                            <div className='item' key={key}>
                                                <Link to={val.slag}>{val.booleanString}</Link>
                                            </div>
                                        )
                                    }
                                </div>
                }
            </div>
        </div>
    )
}

export default Home

