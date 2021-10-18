import React, { Component } from 'react'
import { login } from './utils.js'
import { Link } from 'react-router-dom'



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
    this.props.history.push('/HomePage')
}


render() {
    return (
        <div>
            <section>
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
            <Link to='SignUp'>Don't have an account yet?</Link>
            </section>
        </div>
    )
}
}