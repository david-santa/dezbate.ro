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
                    <Route exact path="/" render={() => this.props.currentUser ? <Redirect to='/dashboard'/> :
                        <Redirect to='/login'/>}/>
                    <Route exact path='/login'
                           render={() => this.props.currentUser ? (<Redirect to='/dashboard'/>) : (<Login/>)}/>
                    <Route path="/dashboard">
                        <Dashboard/>
                    </Route>
                    {/*<Route path={`/profile`} component={Profile}/>*/}
                    <Route path="/profile">
                        <Profile/>
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
