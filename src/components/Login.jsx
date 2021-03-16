import React from 'react'
import {FormControl, Input, InputLabel} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import loginImage from "../res/debateLoginBg.png"
import logo from "../res/logoDezbateRo.png"
import Button from "@material-ui/core/Button";
import {signInWithGoogle} from "../firebase/firebaseUtils";
import {AccountCircle, LockRounded} from "@material-ui/icons"
import {CgFacebook, CgGoogle} from "react-icons/all";

export default class Login extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <Grid container>
            <Grid item xs={false} sm={4} md={7} style={{height:'100vh'}}>
                <img src = {loginImage} style = {{width: '100%',height:'100%', objectFit: 'stretch'}}/>
            </Grid>
            <Grid container item xs={12} sm={8} md={5} alignItems={"center"} direction={"column"} justify={"space-between"} style ={{background:"#212121",color:"aliceblue",}}>
                <div/>
                <div style = {{display:'flex', flexDirection:'column', maxWidth:400, color:"white"}}>
                    <Grid container justify="center">
                        <img src={logo} width = "150"/>
                    </Grid>
                    <FormControl>
                        <InputLabel htmlFor={"userInput"} style = {{color:'aliceblue'}}> Username </InputLabel>
                        <Input startAdornment={<AccountCircle/>} id = "userInput" style={{color:"aliceblue"}} margin={"normal"}/>
                    </FormControl>
                    <br/>
                    <FormControl>
                        <InputLabel htmlFor={"passwordInput"} style = {{color:'aliceblue'}}> Password </InputLabel>
                        <Input startAdornment={<LockRounded/>} id = "passwordInput" type={"password"} style={{color:"aliceblue"}} margin={"normal"} />
                    </FormControl>
                    <div style={{height: 20}}/>
                    <Button color={"secondary"} variant ={"contained"}>Log In </Button>
                    <h5 align={'center'}>OR</h5>
                    <Button onClick = {signInWithGoogle} style={{background:'white'}} variant ={"contained"}> <CgGoogle/> {'\t Sign in with Google'} </Button>
                    <Button color = "primary" onClick = {signInWithGoogle} variant ={"contained"}> <CgFacebook/> {'\t Sign in with Facebook'} </Button>
                    <Button style = {{color:'aliceblue'}}> Don't have an account? Sign up now!</Button>
                </div>
                <div/>
            </Grid>
        </Grid>
        );
    }
}