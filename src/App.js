import React, { Component } from 'react'
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom';
import HomePage from './HomePage.js';



import './App.css'

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
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <HomePage {...routerProps} />} 
                        />
                        {/* <Route 
                            path="/quote" 
                            exact
                            render={(routerProps) => <DetailPage {...routerProps} />} 
                        />
                        <Route 
                          path="/users/:myId" 
                          exact
                          render={(routerProps) => <DetailPage {...routerProps} />} 
                        /> */}
                    </Switch>
                </Router>
            </div>
        )
    }
}