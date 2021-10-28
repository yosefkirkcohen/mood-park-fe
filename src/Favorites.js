import React, { Component } from 'react'
import request from 'superagent'
import './Favorites.css'
import { Button }  from '@mui/material';
import { removeFavorite } from './Utils.js';


const URL = 'https://cryptic-dusk-44349.herokuapp.com'
// const URL = 'http://localhost:7890'

export default class Favorites extends Component {
    state = {
        favorites: []
        
    }

    componentDidMount = async () => {
        const token = this.props.token
        // I would have liked to see these fetches all written out in a separate file, that way 1) they'd be reusable, 2) they'd keep the components cleaner and 3) it would take less work to change the URL for different environments
        const response = await request.get(`${URL}/api/favorites`).set('Authorization', token)
        this.setState({ favorites: response.body })
        
    }

    handleRemove = async (parkCode) => {
        const token = this.props.token
        await removeFavorite(parkCode, token)
        const favs = await request.get(`${URL}/api/favorites`).set
            ('Authorization', token)
        this.setState({ favorites: favs.body })
    }

    
    render() {
        return (
            <div className='favorites-page'>
                <h1>FAVORITE PARKS</h1>
                {this.state.favorites.map(favs => 
                <section key={favs.fullname} className='favorite'> 
                <span>{favs.fullname}</span>
                <span>State: {favs.states}</span>
                <a href={favs.url}> {favs.fullname} Website</a>
                <a href={`/park/${favs.parkcode}`}><Button color = "success">Details</Button></a>
                <Button onClick = {() => this.handleRemove(favs.parkcode)} color = "success">Remove</Button>
                </section>)}
                {/* {this.state.favorites.map(favs => 
                <div key={favs.fullname}> 
                <h1>{favs.fullname}</h1>
                <p> {favs.description}</p>
                <img src={favs.images} alt={favs.fullname} />
                <br />
                <a href={favs.url}> {favs.fullname} Website</a>
                <br />
                State: {favs.states}
                </div>)} */}
            </div>
        
        )
    }
}
