import React, { Component } from 'react'
import request from 'superagent'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

 
import { InputLabel } from '@material-ui/core';
import './DetailPage.css'

const URL = 'https://cryptic-dusk-44349.herokuapp.com'
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
        comments: [],
        userId: ''
    }

    componentDidMount = async () => {

        const parkCode = this.props.match.params._parkCode
        const response = await request.get(URL + `/parkDetail/${parkCode}`);

        this.setState({ park: response.body.data[0], parkCode: parkCode })

        const token = this.props.token
        if (token) {
            const comments = await request.get(URL + `/api/comments/${parkCode}`).set('Authorization', token);
            this.setState({ comments: comments.body })
            console.log(comments.body)

            const userId = await request.get(URL + '/api/user').set('Authorization', token);
            console.log(userId)
            this.setState({ userId: userId.body.id })
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
        
        await request.post(`${URL}/api/comments`).send({ comment: this.state.comment, parkcode: this.state.parkCode }).set('Authorization', token)

        this.componentDidMount()
    }

    handlePostEdit = async (commentId) => {
        const token = this.props.token;

        

        await request.put(`${URL}/api/comments/${commentId}`).send({ comment: this.state.comment }).set('Authorization', token)

        this.componentDidMount()
    }

    render() {
        console.log(this.state)
        return (
            <div className='detail-page'>
            <button onClick={this.handleFavorite}> Add to Favorites </button>
            <section className='park-detail'>
                <h1>{this.state.park.name}</h1>
                <div></div>
                <div></div>

                {this.state.park.states} <br />
                {this.state.park.url} <br />

                <img src={this.state.park.images[0].url} alt='ok' />
                <br />
                {this.state.park.description}
                Activities:

                {this.state.park.activities.map(activity => <div>{activity.name}</div>)}
                <br />
                Park Fee: ${this.state.park.entranceFees[0].cost} <br />
                Hours: {this.state.park.operatingHours[0].standardHours.monday}
                <br /> <br />
                <div>
                    <form onSubmit={this.handleCommentSubmit}>
                        <InputLabel htmlFor="my-input">Post Comment Below</InputLabel>
                        <TextField fullWidth='true' multiline='true' rows={4} label="Comment" id="Comment" variant="outlined" value={this.state.comment} onChange={e => this.setState({ comment: e.target.value })} />
                        <Button variant="contained" type='submit'>Post</Button>
                    </form>
                </div>
                <section>
                    <div>To edit, type new input into the comment box and then hit the edit button for the appropriate post.</div>
                    {this.state.comments.map(comment => {
                        return <div className='comments'>
                            {comment.comment} <br />
                            {comment.timestamp}

                            <div className='user'>User {comment.owner_id} </div>
                            {comment.owner_id === this.state.userId
                                &&
                                <button onClick={() => this.handlePostEdit(comment.id)}>Edit post</button>
                            }
                        </div>
                    })}
                </section>
                </section>
            </div>
        )
    }
}
