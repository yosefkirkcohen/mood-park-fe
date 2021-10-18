import React, { Component } from 'react'
import { signUp } from './utils.js';
import { Link } from 'react-router-dom'

export default class Signup extends Component {

    state = {
        password: '',
        email: ''
    }

    handleSubmit = async e => {
        e.preventDefault();

        const user = await signUp(this.state.email, this.state.password); 
        const token = user.token
        this.props.tokenToLocalStorage(token);
        this.props.history.push('/HomePage')
    }
   

    render() {
        return (
            <div>
                <section>
                    <h4> Sign up </h4>
                <form onSubmit={this.handleSubmit }>
                    <label>
                        email
                        <input value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} 
                        type='email'></input>
                    </label>
                    <label>
                        password
                        <input value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} 
                        type='password'></input>
                    </label>
                    <button>Submit</button>
                </form>
                <Link to = 'SignIn'>Already have an account?  Login</Link>
                </section>
            </div>
        )
    }
}