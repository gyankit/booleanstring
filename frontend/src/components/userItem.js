import React, { Component } from 'react'

import fetchApi from '../helper/fetch-api'
import AuthContext from '../helper/context'

class UserItem extends Component {

    static contextType = AuthContext

    constructor(props) {
        super();
        this.state = {
            val: props.value,
            idx: props.idx,
            type: props.value.type
        }
    }

    updateActive = (active) => {
        const request = {
            query: `
            mutation {
                updateUser(_id: "${this.state.val._id}", update: { active: ${active} }) {
                    _id, name, email, mobile, active, type
                }
            }
        ` };
        this.apicall(request, this.context.getUser('token'), false);
    }

    updateType = (type) => {
        const request = {
            query: `
            mutation {
                updateUser(_id: "${this.state.val._id}", update: { type: ${type} }) {
                    _id, name, email, mobile, active, type
                }
            }
        ` };
        this.apicall(request, this.context.getUser('token'), false);
    }

    deleteUser = (del) => {
        const request = {
            query: `
            mutation {
                updateUser(_id: "${this.state.val._id}", update: {del: ${del}}) {
                    _id, name, email, mobile, active, type
                }
            }
        ` };
        this.apicall(request, this.context.getUser('token'), true);
    }

    apicall = async (request, token, reload) => {
        try {
            const res = await fetchApi(request, token);
            if (res.errors) {
                console.log(res.errors[0].message)
            } else if (reload) {
                this.props.onChange();
            } else {
                this.setState({ val: res.data.updateUser })
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
                <td>{this.state.val._id}</td>
                <td>{this.state.val.name}</td>
                <td>{this.state.val.email}</td>
                <td>{this.state.val.mobile}</td>
                <td>
                    <button className={`button ${this.state.val.active ? 'button-green' : ''}`} onClick={() => this.updateActive(!this.state.val.active)} disabled={this.state.val.type === 0}>{this.state.val.active ? 'Yes' : 'No'}</button>
                </td>
                <td>
                    <select value={this.state.type} onChange={this.handleTypeChange.bind(this)} className='select'>
                        <option value={1}>Admin</option>
                        <option value={2}>Editor</option>
                    </select>
                </td>
                <td>
                    <button className={this.state.type === this.state.val.type ? 'button' : 'button button-default'} disabled={this.state.type === this.state.val.type || this.state.val.type === 0} onClick={() => this.updateType(this.state.type)}>Update</button>
                </td>
                <td>
                    <button className='button button-red' disabled={this.state.val.type === 0 || this.state.val.type === 1} onClick={() => this.deleteUser(true)}>Delete</button>
                </td>
            </tr >
        )
    }
}


export default UserItem
