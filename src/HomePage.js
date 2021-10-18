import React, { Component } from 'react'
import request from 'superagent'
import {Link} from 'react-router-dom'

//const URL = 'https://mood-park-be.herokuapp.com'
 const URL = 'http://localhost:7890'

export default class HomePage extends Component {

    state = {
        parks: [],
        SearchPark: ''
    }

    submitPark = async (e) => {
        e.preventDefault()
        const response = await request.get(`${URL}/park?q=${this.state.SearchPark}`)
        this.setState({ parks: response.body.data })

    }

    handleSearch = async (e) => {
        this.setState({ SearchPark: e.target.value })
    }

    componentDidMount = async () => {
        const response = await request.get(URL + '/parks')
        this.setState({ parks: response.body.data })
    }
    render() {
        return (
            <>
                <div>
                    <form onSubmit={this.submitPark}>
                        <label>
                            <input onChange={this.handleSearch} />
                        </label>
                        <button type='submit'> Find </button>
                    </form>
                </div>
                <div>
                    {this.state.parks.map(park => <Link to={`/park/${park.parkCode}`}> {park.fullName} 
                                                    <img src={park.images[0].url} alt={park.fullName} />  
                    
                                                 </Link>)}
                </div>
            </>
        )
    }
}
