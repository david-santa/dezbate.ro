
import './App.css';
import Login from "./components/Login";
import React from "react";
import {auth} from "./firebase/firebaseUtils";
import {Redirect, Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Dashboard from './components/Dashboard'

class App extends React.Component {

    constructor(){
        super();

        this.state = {
            currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
            this.setState({currentUser: user});
            console.log(user);
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        {this.state.currentUser?<Redirect to = "/dashboard"/>:<Login/>}
                    </Route>
                    <Route path = "/dashboard">
                        <Dashboard currentUser = {this.state.currentUser}/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
