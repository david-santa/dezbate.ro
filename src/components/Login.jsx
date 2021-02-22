import React from 'react'
import {Divider, FormControl, Input, InputAdornment, InputLabel} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import loginImage from "../res/debateLoginBg.png"
import TextField from "@material-ui/core/TextField";
import logo from "../res/logoDezbateRo.png"
import Button from "@material-ui/core/Button";
import {signInWithGoogle} from "../firebase/firebaseUtils";
import {AccountCircle, LockRounded} from "@material-ui/icons"
import {blue} from "@material-ui/core/colors";

export default class Login extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <Grid container style={{minHeight: '100vh'}}>
            <Grid item xs={12} sm={6}>
                <img src = {loginImage} style = {{width: '100%',height:'100%', objectFit: 'stretch'}}/>
            </Grid>
            <Grid container item xs={12} sm={6} alignItems={"center"} direction={"column"} justify={"space-between"} style ={{padding:10, background:"#212121",color:"aliceblue"}}>
                <div/>
                <div style = {{display:'flex', flexDirection:'column', maxWidth:400, minWidth:300, color:"white"}}>
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
                    <Button color={"primary"} variant ={"contained"}>Log In</Button>
                    <Button onClick = {signInWithGoogle} style={{background:'white'}} variant ={"contained"}>Sign in with Google</Button>
                    <Button style = {{color:'aliceblue'}}> Don't have an account? Sign up now!</Button>
                </div>
                <div/>
            </Grid>
        </Grid>
        );
    }
}