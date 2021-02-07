import React from 'react'
import {Card} from 'primereact/card'
import {Divider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import loginImage from "../res/loginImage.png"

export default class Login extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
        <div id={'backgroundLogin'} style={{"margin":"auto","padding-top":"0rem"}}>
            <br/>
            <Card id={'cardLogin'} style={{"background": "#404040","width":"80vw", "height":"40vh","margin":"auto","padding":"3rem","border-radius":"15px"}}>
                <Grid container alignItems="center">
                    <div style={{"background":"aliceblue"}}>
                        <h1>Bun venit!</h1>
                        <input type={"text"} placeholder={"Username"}/> <br/>
                        <input type={"password"} placeholder={"Password"}/> <br/>
                        <button>Sign In</button>
                        <p>Don't have an account yet? <a href={"register"}>Sign Up Now</a></p>
                    </div>
                    <Divider orientation={"vertical"} flexItem/>
                    <img src = {loginImage} width={"500rem"}/>
                </Grid>
            </Card>
        </div>
            </div>
        );
    }
}