import React, { Component } from 'react'
import request from 'superagent'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const URL = 'https://mood-park-be.herokuapp.com'
// const URL = 'http://localhost:7890'

export default class DetailPage extends Component {

    state = {
        parkCode: '',

        park: {
            images: [{ url: '' }],
            activities: [{ name: '' }],
            entranceFees: [{ cost: '' }],
            operatingHours: [{ standardHours: { monday: '' } }]
        }

    }

    componentDidMount = async () => {

        const parkCode = this.props.match.params._parkCode
        const response = await request.get(URL + `/parkDetail/${parkCode}`);
        this.setState({ park: response.body.data[0] })

        console.log(this.state.park)

    }

    handleFavorite = async () => {
        const token = this.props.token
        const response = await request.post(`${URL}/api/favorite`).send(this.state.park).set('Authorization', token)
        return response.body.data

    }

    render() {
        return (
            
            
            <div>


                {this.state.park.name} <br />
                {this.state.park.states} <br />
                {this.state.park.url} <br />

                <img src={this.state.park.images[0].url} alt='ok' />
                <br />
                {this.state.park.description} <br /> <br />
                Activities:
                {console.log(this.state.park.activities)}
                {this.state.park.activities.map(activity => <div>{activity.name}</div>)}
                <br />
                Cost: ${this.state.park.entranceFees[0].cost} <br />
                Hours: {this.state.park.operatingHours[0].standardHours.monday}



                <button onClick={this.handleFavorite}> Add to Favorites </button>
                {this.state.park.name}
                <img src={this.state.park.images[0].url} alt='ok' /> 
                {this.state.park.description}
                
                <FormControl>
                    <TextField multiline label="Comment" id="Comment" variant="outlined" />
                    <Button variant="contained">Submit</Button>
                </FormControl>
                





            </div>
            
        )
    }
}
