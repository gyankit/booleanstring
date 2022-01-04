import React, { Component } from 'react'

import fetchApi from '../helper/fetch-api'

class BooleanStringItem extends Component {

    constructor(props) {
        super();
        this.state = {
            val: props.value,
            idx: props.idx
        }
    }

    updateActive = (active) => {
        const request = {
            query: `
            mutation {
                updateBooleanString(_id: "${this.state.val._id}", update: { booleanString: "${this.state.val.booleanString}", slag: "${this.state.val.slag}", state: ${active} }) {
                    _id, booleanString, slag, position, skill, location, state
                }
            }
        ` };
        this.apicall(request, false);
    }

    deleteUser = (del) => {
        const request = {
            query: `
            mutation {
                updateBooleanString(_id: "${this.state.val._id}", update: { booleanString: "${this.state.val.booleanString}", slag: "${this.state.val.slag}", state: ${this.state.val.state}, del: ${del}}) {
                    _id, booleanString, slag, position, skill, location, state
                }
            }
        ` };
        this.apicall(request, true);
    }

    apicall = async (request, reload) => {
        try {
            const res = await fetchApi(request);
            if (res.errors) {
                console.log(res.errors[0].message)
            } else if (reload) {
                this.props.onChange();
            } else {
                this.setState({ val: res.data.updateBooleanString })
                this.render();
            }
        } catch (err) {
            console.error(err);
        }
    }

    handleTypeChange = (e) => {
        this.setState({ type: Number(e.target.value) });
    }

    render() {
        return (
            <tr>
                <td>{this.state.idx + 1}</td>
                <td>{this.state.val.booleanString}</td>
                <td>{this.state.val.slag}</td>
                <td>{this.state.val.position}</td>
                <td>{this.state.val.skill}</td>
                <td>{this.state.val.location}</td>
                <td>
                    <button className={`button ${this.state.val.state ? 'button-green' : ''}`} onClick={() => this.updateActive(!this.state.val.state)}>{this.state.val.state ? 'Enable' : 'Disable'}</button>
                </td>
                <td>
                    <button className='button button-red' disabled={this.state.val.type === 0 || this.state.val.type === 1} onClick={() => this.deleteUser(true)}>Delete</button>
                </td>
            </tr >
        )
    }
}

export default BooleanStringItem
