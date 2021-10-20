import React, { Component } from 'react'
import request from 'superagent'
import { Link } from 'react-router-dom'
import { isFavorite } from './Utils.js'

// const URL = 'https://mood-park-be.herokuapp.com'
const URL = 'http://localhost:7890'

export default class HomePage extends Component {

    state = {
        parks: [],
        SearchPark: '',
        favorites: []
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
        const token = this.props.token
        const response = await request.get(URL + '/parks')
        if (token) {
        const favs = await request.get(`${URL}/api/favorites`).set
        ('Authorization', token)
        this.setState({favorites: favs.body})
        }
        this.setState({ parks: response.body.data,
         })
        
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
                    {this.state.parks.map(park => <Link to={`/park/${park.parkCode}`} key={park.fullName}> {park.fullName}
                        <img src={park.images[0].url} alt={park.fullName} />
                        {isFavorite(park, this.state.favorites) && "favorite"}
                    </Link>)}
                </div>
            </>
        )
    }
}
