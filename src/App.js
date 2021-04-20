import './App.css';
import Login from "./components/Login";
import React from "react";
import {auth, createUserProfileDocument} from "./firebase/firebaseUtils";
import {Redirect, Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Profile from "./components/Profile";
import firebase from "firebase";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import {Add} from "@material-ui/icons";
import AddDebate from "./components/AddDebate";

class App extends React.Component {

    unsubscribeFromAuth = null;

    componentDidMount() {

        const {setCurrentUser} = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
            if (user) {
                const userRef = await createUserProfileDocument(user);
                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                })
            }
            setCurrentUser({user});
        })
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" >
                        <Dashboard/>
                    </Route>
                    <Route exact path='/login'>
                        <Login/>
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard/>
                    </Route>
                    <Route path="/profile">
                        <Profile/>
                    </Route>
                    <Route path="/add">
                        <AddDebate/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);