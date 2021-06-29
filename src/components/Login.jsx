import React from 'react'
import {FormControl, Input, InputLabel} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import loginImage from "../res/debateLoginBg.png"
import logo from "../res/logoDezbateRo.png"
import Button from "@material-ui/core/Button";
import firebase from 'firebase';
import {signInWithFacebook, signInWithGoogle} from "../firebase/firebaseUtils";
import {AccountCircle, Email, LockRounded} from "@material-ui/icons"
import {CgFacebook, CgGoogle} from "react-icons/all";
import {setCurrentUser} from "../redux/user/user.actions";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLogin: true,
        emailInput: '',
        userInput: '',
        passInput: '',
        confirmPassInput: ''
    }


    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSwitchButton = () => {
        this.setState({isLogin: !this.state.isLogin});
    }

    handleEmailPassSignIn = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.emailInput, this.state.passInput)
            .then((userCredential) => {
                console.log(userCredential)
                this.props.setCurrentUser(userCredential.user)
                if(userCredential.user){
                    window.location.replace('/')
                }
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }

    handleSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.emailInput, this.state.passInput)
            .then((result) => {
                return result.user.updateProfile({
                    displayName: this.state.userInput,
                    isAdmin: false
                })
            })
            .catch((error) => {
                var errorMessage = error.message;
                // ..
                alert(errorMessage)
            });
    }

    handleSignInWithGoogle = () => {
        signInWithGoogle().then(r => this.props.setCurrentUser(r.user)).then(r=>window.location.replace('/'));
    }

    handleSignInWithFacebook = () => {
        signInWithFacebook().then(r => this.props.setCurrentUser(r.user)).then(r=>window.location.replace('/'));
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={false} sm={4} md={7} style={{height: '100vh'}}>
                    <img src={loginImage} style={{width: '100%', height: '100%', objectFit: 'stretch'}}/>
                </Grid>
                <Grid container item xs={12} sm={8} md={5} alignItems={"center"} direction={"column"}
                      justify={"space-between"} style={{background: "#212121", color: "aliceblue",}}>
                    <div/>
                    <div style={{display: 'flex', flexDirection: 'column', maxWidth: 400, color: "white"}}>
                        <Grid container justify="center">
                            <img src={logo} width="150"/>
                        </Grid>
                        {this.state.isLogin ?
                            <></>
                            :
                            <FormControl>
                                <InputLabel htmlFor={"userInput"} style={{color: 'aliceblue'}}> Username </InputLabel>
                                <Input name={"userInput"} value={this.state.userInput} onChange={this.handleInputChange}
                                       startAdornment={<AccountCircle/>} id="userInput" style={{color: "aliceblue"}}/>
                            </FormControl>
                        }
                        <br/>
                        <FormControl>
                            <InputLabel htmlFor={"emailInput"} style={{color: 'aliceblue'}}> Email </InputLabel>
                            <Input name={"emailInput"} value={this.state.emailInput}
                                   onChange={this.handleInputChange} startAdornment={<Email/>} id="emailInput"
                                   style={{color: "aliceblue"}}/>
                        </FormControl>
                        <br/>
                        <FormControl>
                            <InputLabel htmlFor={"passwordInput"} style={{color: 'aliceblue'}}> Password </InputLabel>
                            <Input value={this.state.passInput} name={"passInput"} onChange={this.handleInputChange}
                                   startAdornment={<LockRounded/>} id="passwordInput" type={"password"}
                                   style={{color: "aliceblue"}}/>
                        </FormControl>
                        <br/>
                        {this.state.isLogin ?
                            <></>
                            :
                            <FormControl>
                                <InputLabel htmlFor={"confirmPassInput"} style={{color: 'aliceblue'}}> Confirm
                                    password </InputLabel>
                                <Input name={"confirmPassInput"} onChange={this.handleInputChange}
                                       startAdornment={<LockRounded/>} id="confirmPassInput" type={"password"}
                                       style={{color: "aliceblue"}}/>
                            </FormControl>
                        }
                        <div style={{height: 20}}/>
                        <Button onClick={this.state.isLogin ? this.handleEmailPassSignIn : this.handleSignUp}
                                color={"secondary"}
                                variant={"contained"}>{this.state.isLogin ? "Log In" : "Sign up"}</Button>
                        <h5 align={'center'}>OR</h5>
                        <Button onClick={this.handleSignInWithGoogle} style={{background: 'white'}} variant={"contained"}>
                            <CgGoogle/> {'\t Sign in with Google'} </Button>
                        <Button color="primary" onClick={this.handleSignInWithFacebook} variant={"contained"}>
                            <CgFacebook/> {'\t Sign in with Facebook'} </Button>
                        <Button onClick={this.handleSwitchButton}
                                style={{color: 'aliceblue'}}> {this.state.isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"} </Button>
                    </div>
                    <div/>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);