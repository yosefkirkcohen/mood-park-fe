import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom';
import HomePage from './HomePage.js';
import './App.css'
import Navigation from './Navigation.js';
import Favorites from './Favorites.js';
// import LogIn from './LogIn.js';
// import SignUp from './SignUp.js';


export default class App extends Component {
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
                        {/* <Route 
                            path="/login" 
                            exact
                            render={(routerProps) => <LogIn {...routerProps} />} 
                        />
                        <Route 
                            path="/sign-up" 
                            exact
                            render={(routerProps) => <SignUp {...routerProps} />} 
                        /> */}
                        <Route 
                            path="/favorites" 
                            exact
                            render={(routerProps) => <Favorites {...routerProps} />} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}