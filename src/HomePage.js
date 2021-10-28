import React, { Component } from 'react'
import request from 'superagent'
// import { Link } from 'react-router-dom'
import { isFavorite } from './Utils.js'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Grid } from '@mui/material';
import { Button }  from '@mui/material';
import { TextField } from '@mui/material';
import { removeFavorite } from './Utils.js';
import ButtonGroup from '@mui/material/ButtonGroup';
// import DetailPage from './DetailPage.js';

import './HomePage.css'

const URL = 'https://cryptic-dusk-44349.herokuapp.com'
// const URL = 'http://localhost:7890'

export default class HomePage extends Component {

    state = {
        parks: [],
        // capitalized variables feel a little weird unless they are components or classes
        searchPark: '',
        favorites: [],
        parkCode: '',
        start: 0,
        isLoading: false
    }

    submitPark = async (e) => {
        e.preventDefault()
        const response = await request.get(`${URL}/park?q=${this.state.searchPark}`)
        this.setState({ parks: response.body.data })
    }

    handleSearch = async (e) => {
        this.setState({ searchPark: e.target.value })
    }

    handleRemove = async (parkCode) => {
        const token = this.props.token
        await removeFavorite(parkCode, token)
        const favs = await request.get(`${URL}/api/favorites`).set
            ('Authorization', token)
        this.setState({ favorites: favs.body })
    }

    handleFavorite = async (park) => {

        const token = this.props.token
        await request.post(`${URL}/api/favorites`).send(park).set('Authorization', token)
        const favs = await request.get(`${URL}/api/favorites`).set
            ('Authorization', token)
        this.setState({ favorites: favs.body })
    }

    doAsyncStuff = () => {
        this.setState({ isLoading: true })
        const token = this.props.token
        const response = await request.get(`${URL}/parks?start=${this.state.start}`)
        if (token) {
            const favs = await request.get(`${URL}/api/favorites`).set
                ('Authorization', token)
            this.setState({ favorites: favs.body })
        }
        this.setState({ parks: response.body.data, isLoading: false })

    }

    componentDidMount = async () => {
        await this.doAsyncStuff();
    }

    nextTwenty = async () => {
        await this.setState({ start: this.state.start + 20 })
        // it's usually a better idea to move code to another method rather than call componentDidMoun explicitly. Cool thinking though, showing a lot of understanding about how classes work
        this.doAsyncStuff()
    }

    previousTwenty = async () => {
        await this.setState({ start: this.state.start - 20 })
        this.doAsyncStuff()
    }

    firstTwenty = async () => {
        await this.setState({ start: 0 })
        this.doAsyncStuff()
    }

    render() {
        
        return (
        <React.Fragment>
        
            <Grid
                container
                direction="column"
                justifyContent="top"
                alignItems="center"
            >
                <section className='home-page-head'>
                    <h1>Parks 4ME</h1>
                    <p>Parks 4ME helps you plan your next National Park adventure.
                        <br />
                        Browse through the comprehensive list of parks and historical sites. 
                        <br />
                        See details about each park, and reviews that others have shared.
                        <br />
                        <b>Sign up for an account to bookmark your favorite National Parks and share your park reviews with others.</b>
                    </p>
                </section>
                <div>
                    <ButtonGroup style={{marginBottom: '10px'}}>
                    <Button variant = 'contained' className='change-results' onClick={this.firstTwenty} disabled={this.state.start < 20}>First 20</Button>
                    <Button variant = 'contained' className='change-results' onClick={this.previousTwenty} disabled={this.state.start < 20}>Previous 20</Button>
                    <Button variant = 'contained' className='change-results' onClick={this.nextTwenty} disabled={this.state.parks.length < 20}>Next 20</Button>
                    </ButtonGroup>
                    <form onSubmit={this.submitPark}>
                        <label>
                            <TextField id="outlined-basic" label="Search By Name" size='small' variant="outlined" type='text' required onChange={this.handleSearch} />
                        </label>
                        <Button type='submit' variant='contained'> Find Park </Button>
                    </form>
                </div>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="top"
                >
                    {this.state.parks.map(park =>
                        <Card style = {{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', marginBottom: '10px', marginTop: '10px' }} sx={{ maxWidth: 345 }}>
                            <CardActionArea href={`/park/${park.parkCode}`}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={park.images[0].url}
                                    alt={park.fullname}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {park.fullName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {park.description}
                                    </Typography>
                                </CardContent>
                                {/* <div style = {{height: 100}}></div> */}
                            </CardActionArea>
                           { this.props.token && <CardActions>
                                {
                                    // very cool! nice work figuring out how to render favorites differently from other parks
                                    isFavorite(park, this.state.favorites)
                                        ? <IconButton size='large' color='error' aria-label="add to favorites" onClick={() => this.handleRemove(park.parkCode)}>
                                            <FavoriteIcon />
                                        </IconButton>
                                        : <IconButton size='large' aria-label="add to favorites" onClick={() => this.handleFavorite(park)}>
                                            <FavoriteIcon />
                                        </IconButton>
                                }
                            </CardActions> }
                        </Card>
                    )}
                </Grid>
            </Grid>
            </React.Fragment>
        )
    }
}
