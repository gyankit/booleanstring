import React, { Component } from 'react'

import Heading from '../components/Heading'
import api from '../helper/api.json'

class DataEntry extends Component {

    constructor() {
        super();
        this.state = {
            position: '',
            skill: '',
            location: '',
            booleanString: '',
            slag: '',
            success: false
        }
    }

    updateBooleanSlag = async () => {
        await this.setState({ booleanString: this.state.position.concat(" or ", this.state.skill, " or ", this.state.location) });
        await this.setState({ slag: this.state.booleanString.toLowerCase().split(' ').join('_') });
        return;
    }

    formSubmit = async (e) => {
        e.preventDefault();
        await this.updateBooleanSlag();

        const request = {
            query: `
            mutation {
                createBooleanString(stringInput: { position: "${this.state.position}", skill: "${this.state.skill}", location: "${this.state.location}", booleanString: "${this.state.booleanString}", slag: "${this.state.slag}"}) {
                    _id, booleanString, slag
                }
            }
        ` };

        fetch(api.url, {
            method: api.method,
            headers: api.headers,
            body: JSON.stringify(request)
        })
            .then(res => res.json())
            .then(result => {
                if (result.errors) {
                    console.log(result.errors[0].message)
                } else {
                    this.setState({ success: true })
                    this.render();
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <React.Fragment>
                <Heading heading="Data Entry Page" />
                <div className='container'>
                    {
                        this.state.success ?
                            <div className='success'>
                                Data Uploaded Successfully! Check with Administrator for Verification
                            </div> : ''

                    }

                    <form className='form' onSubmit={this.formSubmit}>
                        <div className='form-control'>
                            <label htmlFor="position">Position</label>
                            <textarea rows={5} onChange={(e) => this.setState({ position: e.target.value })} required></textarea>
                        </div>
                        <div className='form-control'>
                            <label htmlFor="skill">Skill</label>
                            <textarea rows={5} onChange={(e) => this.setState({ skill: e.target.value })} required></textarea>
                        </div>
                        <div className='form-control'>
                            <label htmlFor="location">Location</label>
                            <textarea rows={5} onChange={(e) => this.setState({ location: e.target.value })} required></textarea>
                        </div>
                        <div className='form-control'>
                            <button className='button button-green' type='submit' >Submit</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default DataEntry
