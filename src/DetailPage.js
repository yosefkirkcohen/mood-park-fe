import React, { Component } from 'react'
import request from 'superagent'
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const URL = 'https://mood-park-be.herokuapp.com'
// const URL = 'http://localhost:7890'

export default class DetailPage extends Component {

    state = {
        parkCode: '',
        park: { images: [{ url: '' }] },
        favorite: ''
    }

    componentDidMount = async () => {

        const parkCode = this.props.match.params._parkCode
        const response = await request.get(URL + `/parkDetail/${parkCode}`);
        this.setState({ park: response.body.data[0] })

    }

    handleFavorite = async () => {
        const token = this.props.token
        const response = await request.post(`${URL}/api/favorite`).send(this.state.park).set('Authorization', token)
        return response.body.data

    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
            <div>
                <button onClick={this.handleFavorite}> Add to Favorites </button>
                {this.state.park.name}
<<<<<<< HEAD
                <img src={this.state.park.images[0].url} alt='ok' /> 
                {this.state.park.description}
                
                <FormControl>
                    <TextField multiline label="Comment" id="Comment" variant="outlined" />
                    <Button variant="contained">Submit</Button>
                </FormControl>
                
=======

                <img src={this.state.park.images[0].url} alt='ok' />

                {this.state.park.description}


>>>>>>> dd301491ca9ee1611cc7bb921a600845e634fcce
            </div>
            </React.Fragment>
        )
    }
}
