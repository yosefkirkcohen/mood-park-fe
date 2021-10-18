import React, { Component } from 'react'
import request from 'superagent'

 //const URL = 'https://mood-park-be.herokuapp.com'
const URL = 'http://localhost:7890'

export default class HomePage extends Component {

    state = {
        parks: []
    }

    componentDidMount = async () => {
        const response = await request.get(URL + '/parks')
        this.setState({parks: response.body.data})
    }
    render() {
        return (
            <div>
                {this.state.parks.map(park => <div>{park.fullName} <img src = {park.images[0].url} alt = {park.fullName} />  </div>)}
            </div>
        )
    }
}
