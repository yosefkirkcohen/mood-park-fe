import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        return (
            <div>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
                <NavLink exact activeClassName="active" to="/favorites">My Parks</NavLink>
                <NavLink exact activeClassName="active" to="/login">Log In</NavLink>
                <NavLink exact activeClassName="active" to="/sign-up">Sign Up</NavLink>
<<<<<<< HEAD
                
=======
                <NavLink exact activeClassName="active" to="/aboutus">About Us</NavLink>
                <button onClick={this.props.logout}>Log Out</button>
>>>>>>> dd301491ca9ee1611cc7bb921a600845e634fcce
            </div>
        )
    }
}
