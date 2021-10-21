import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Navigation extends Component {
    render() {
        return (
            <div className='nav-bar'>
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
                {this.props.token && <NavLink exact activeClassName="active" to="/favorites">Favorite Parks</NavLink>}
                {!this.props.token && <NavLink exact activeClassName="active" to="/login">Log In</NavLink>}
                {!this.props.token && <NavLink exact activeClassName="active" to="/sign-up">Sign Up</NavLink>}
                <NavLink exact activeClassName="active" to="/aboutus">About Us</NavLink>
                {this.props.token && <button onClick={this.props.logout}>Logout</button>}
            </div>
        )
    }
}
