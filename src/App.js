import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import HomePage from './HomePage.js';


import DetailPage from './DetailPage.js';
import './App.css'
import Navigation from './Navigation.js';
import Favorites from './Favorites.js';
import LogIn from './LogIn.js';
import SignUp from './SignUp.js';


const TOKEN_KEY = 'TOKEN'

export default class App extends Component {

    state = {
        token: localStorage.getItem(TOKEN_KEY) || ''
    }

    tokenToLocalStorage = token => {
        localStorage.setItem(TOKEN_KEY, token)
        this.setState({ token: token })
    }





    render() {
        return (
            <div>
                <Router>
                    <Navigation />
                    <Switch>
                        <Route
                            path="/"
                            exact
                            render={(routerProps) => <HomePage {...routerProps} />}
                        />
                        <Route
                            path="/park/:_parkCode"
                            exact
                            render={(routerProps) => <DetailPage token={this.state.token} {...routerProps} />}
                        />
                        <Route
                            path="/login"
                            exact
                            render={(routerProps) => <LogIn tokenToLocalStorage={this.tokenToLocalStorage} {...routerProps} />}
                        />
                        <Route
                            path="/sign-up"
                            exact
                            render={(routerProps) => <SignUp tokenToLocalStorage={this.tokenToLocalStorage} {...routerProps} />}
                        />
                        <Route
                            path="/favorites"
                            exact
                            render={(routerProps) => <Favorites token={this.state.token} {...routerProps} />}
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}
