import React, { Component } from 'react'
import request from 'superagent'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from './Menu.js'
 

const URL = 'https://mood-park-be.herokuapp.com'
//  const URL = 'http://localhost:7890'

export default class DetailPage extends Component {

    state = {
        parkCode: '',

        park: {
            images: [{ url: '' }],
            activities: [{ name: '' }],
            entranceFees: [{ cost: '' }],
            operatingHours: [{ standardHours: { monday: '' } }]
        },
        comment: '',
        comments: []
    }

    componentDidMount = async () => {

        const parkCode = this.props.match.params._parkCode
        const response = await request.get(URL + `/parkDetail/${parkCode}`);
        
        this.setState({ park: response.body.data[0], parkCode: parkCode })

        const token = this.props.token
        if (token) {
        const comments = await request.get(URL + `/api/comments/${parkCode}`).set('Authorization', token);
            this.setState({comments: comments.body})
            console.log(this.state.comments)
        }
    }

    handleFavorite = async () => {
        const token = this.props.token
        const response = await request.post(`${URL}/api/favorites`).send(this.state.park).set('Authorization', token)
        return response.body.data
    }

    handleCommentSubmit = async (e) => {
        e.preventDefault();
        const token = this.props.token;
         await request.post(`${URL}/api/comments`).send({comment: this.state.comment, parkcode: this.state.parkCode}).set('Authorization', token)

        this.componentDidMount()
    }

    render() {
        return (
            <React.Fragment>
                <Menu />
            <div>
                {this.state.park.name} <br />
                {this.state.park.states} <br />
                {this.state.park.url} <br />

                <img src={this.state.park.images[0].url} alt='ok' />
                <br />
                {this.state.park.description} <br /> <br />
                Activities:
                
                {this.state.park.activities.map(activity => <div>{activity.name}</div>)}
                <br />
                Cost: ${this.state.park.entranceFees[0].cost} <br />
                Hours: {this.state.park.operatingHours[0].standardHours.monday}



                <button onClick={this.handleFavorite}> Add to Favorites </button>
                {this.state.park.name}
                <img src={this.state.park.images[0].url} alt='ok' />
                {this.state.park.description}

                

                <form onSubmit={this.handleCommentSubmit}>
                    <input value={this.state.comment} onChange={e => this.setState({comment: e.target.value})}/>
                    <button>Post</button>
                </form>

                <section>
                    {this.state.comments.map(comment => {
                        return <div>
                        {comment.comment} <br/>
                         User: {comment.owner_id}
                        </div>
                        })}
                </section>


               
                
                    <TextField fullWidth = 'true' multiline = 'true' rows = {4} label="Comment" id="Comment" variant="outlined" />
                    <Button variant="contained" type = 'submit'>Submit</Button>
                
            </div>

            </React.Fragment>
        )
    }
}
