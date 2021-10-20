import React, { Component } from 'react'
import { login } from './Utils.js'
import { Link } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



export default class Signin extends Component {
    
    state = {
    password: '',
    email: ''
}

handleSubmit = async e => {
    e.preventDefault();
    
    const user = await login(this.state.email, this.state.password); 
    const token = user.token
    this.props.tokenToLocalStorage(token);
    this.props.history.push('/')
}


render() {
    return (
        <div>
            {/* <section>
                <h4> Sign In </h4>
            <form onSubmit={this.handleSubmit }>
                   
                <label>
                    Email
                </label>
                    <input value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} 
                    type='email'></input>
                
                <label>
                    password
                    <input value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} 
                    type='password'></input>
                </label>
                
                <button color='primary'>Submit</button>
                
            </form>
            <Link to='/sign-up'>Don't have an account yet?</Link>
            </section> */}
        








<Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={this.state.email} 
              onChange={(e) => this.setState({email: e.target.value})}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password} 
              onChange={(e) => this.setState({password: e.target.value})}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
      </div>













    )
}
}