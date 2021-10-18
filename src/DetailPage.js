import React, { Component } from 'react'
import {request} from 'superagent'

 const URL = 'https://mood-park-be.herokuapp.com'
 //const URL = 'http://localhost:7890'

export default class DetailPage extends Component {

    state = {
        parkCode: this.props.match.params._parkCode,
        park: ''
    }

    componentDidMount = async () => {
        const parkCode = this.state.parkCode
        const response = await request.get(URL + `/park?parkCode=${parkCode}`);
        this.setState({park: response.body})
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
