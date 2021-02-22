import React from 'react'
import {Divider, InputAdornment} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import loginImage from "../res/debateLoginBg.png"
import TextField from "@material-ui/core/TextField";
import logo from "../res/logoDezbateRo.png"
import Button from "@material-ui/core/Button";
import {signInWithGoogle} from "../firebase/firebaseUtils";
import {AccountCircle, LockRounded} from "@material-ui/icons"

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
            <Grid container item xs={12} sm={6} alignItems={"center"} direction={"column"} justify={"space-between"} style ={{padding:10, background:"aliceblue",color:"aliceblue"}}>
                <div/>
                <div style = {{display:'flex', flexDirection:'column', maxWidth:400, minWidth:300, color:"white"}}>
                    <Grid container justify="center">
                        <img src={logo} width = "150"/>
                        <h1> hau </h1>
                    </Grid>
                    <TextField label={"Username"} margin={"normal"} InputProps={{startAdornment: <InputAdornment position={"start"}><AccountCircle/></InputAdornment>}}/>
                    <TextField type={"password"} label={"Password"} margin={"normal"} InputProps={{startAdornment: <InputAdornment position={"start"}><LockRounded/></InputAdornment>}}/>
                    <div style={{height: 20}}/>
                    <Button color={"primary"} variant ={"contained"}>Log In</Button>
                    <Button onClick = {signInWithGoogle} color={"primary"} variant ={"contained"}>Log In With Gogle</Button>
                    <Button> Don't have an account? Sign up now!</Button>
                </div>
                <div/>
                {/*Authentication folosind OAUTH. DEPRECATED pentru ca voi folosi Firebase*/}
                {/*<GoogleLogin isSignedIn = {true} clientId={"189754080959-7uoa5k0k156grh0pafm6v2n1ka2jb06t.apps.googleusercontent.com"} onSuccess={this.logResponse} onFailure={this.logResponse}/>*/}
            </Grid>
        </Grid>
        );
    }
}

    //<div>
    // <div id={'backgroundLogin'} style={{"margin":"auto","padding-top":"0rem"}}>
    //     <br/>
    //     <Card id={'cardLogin'} style={{"background": "#404040","width":"80vw", "height":"40vh","margin":"auto","padding":"3rem","border-radius":"15px"}}>
    //         <Grid container alignItems="center">
    //             <div style={{"background":"aliceblue"}}>
    //                 <h1>Bun venit!</h1>
    //                 <input type={"text"} placeholder={"Username"}/> <br/>
    //                 <input type={"password"} placeholder={"Password"}/> <br/>
    //                 <button>Sign In</button>
    //                 <p>Don't have an account yet? <a href={"register"}>Sign Up Now</a></p>
    //             </div>
    //             <Divider orientation={"vertical"} flexItem/>
    //             <img src = {loginImage} width={"500rem"}/>
    //         </Grid>
    //     </Card>
    // </div>
    //     </div>