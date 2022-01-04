import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Heading from '../components/heading'
import Notification from '../components/notification'
import api from '../helper/api.json'

const BooleanString = () => {

    const { slag } = useParams();
    const [item, setItem] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = {
            query: `query {
                booleanString(slag: "${slag}", state: ${true}) {
                    booleanString, slag, position, skill, location
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
                setItem(result.data.booleanString[0]);
            })
            .catch(err => console.log(err));
    }, [slag]);

    return (
        <React.Fragment>
            <Heading heading={item.booleanString} />
            <div>
                {
                    loading ? <div className="lds-dual-ring"></div>
                        :
                        error !== null ?
                            <Notification isError={true} error={error} />
                            :
                            <div className='list'>
                                <div className='item'> BooleanString : <span>{item.booleanString}</span> </div>
                                <div className='item'> Position : <span>{item.position}</span> </div>
                                <div className='item'> Skill : <span>{item.skill}</span> </div>
                                <div className='item'> Location : <span>{item.location}</span> </div>
                            </div>
                }
            </div>
        </React.Fragment>
    )
}

export default BooleanString
