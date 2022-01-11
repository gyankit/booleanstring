import React, { Component } from 'react'

import fetchApi from '../helper/fetch-api'
import AuthContext from '../helper/context'

class BooleanStringItem extends Component {

    static contextType = AuthContext

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
                updateBooleanString(_id: "${this.state.val._id}", update: { state: ${active} }) {
                    _id, booleanString, field, state
                }
            }
        ` };
        this.apicall(request, this.context.getUser('token'), false);
    }

    deleteUser = (del) => {
        const request = {
            query: `
            mutation {
                updateBooleanString(_id: "${this.state.val._id}", update: { state: ${this.state.val.state}, del: ${del}}) {
                    _id, 
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
                <td>
                    {
                        this.state.val.field.map((e, i) => {
                            return (<div key={i}>{i} - {e}</div>)
                        })
                    }
                </td>
                {
                    (this.context.getUser('type') === '1' || this.context.getUser('type') === '0') &&
                    <>
                        <td>
                            <button className={`button ${this.state.val.state ? 'button-green' : ''}`} onClick={this.context.getUser('type') === '2' ? () => { this.props.showError() } : () => this.updateActive(!this.state.val.state)} >
                                {this.state.val.state ? 'Enable' : 'Disable'}
                            </button>
                        </td>
                        <td>
                            <button className='button button-red' disabled={this.state.val.type === 0 || this.state.val.type === 1} onClick={this.context.getUser('type') === '2' ? () => { this.props.showError() } : () => this.deleteUser(true)}>
                                Delete
                            </button>
                        </td>
                    </>
                }
            </tr >
        )
    }
}

export default BooleanStringItem
