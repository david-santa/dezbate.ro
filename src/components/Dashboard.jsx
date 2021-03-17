import React from "react";
import {auth} from "../firebase/firebaseUtils";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import logoFaraText from '../res/logoFaraText.png'
import {withStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar} from "@material-ui/core";

const styles = (theme) => ({
    snapRight: {
        'margin-left': 'auto',
    }
})

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.currentUser)
        const {classes} = this.props;
        return (
            <div className={"dashboard_container"}>
                <AppBar>
                    <Toolbar>
                        <img src={logoFaraText} height={"50px"}/>
                        <Button size={"large"} color={"secondary"}
                                style={{padding: '10px 10px 10px 20px', 'font-size': '18px'}}>Descopera</Button>
                        <Button size={"large"} color={"secondary"} style={{padding: '10px', 'font-size': '18px'}}>Incepe
                            o dezbatere</Button>
                        <p className={classes.snapRight}>{this.props.currentUser.name}</p>
                    </Toolbar>
                </AppBar>
                <div>
                    {console.log(this.currentUser)}
                    {this.props.currentUser ?
                        <div><h1>I am the Dashboard!</h1> <Button onClick={() => auth.signOut()}> Sign Out </Button>
                        </div> : <Redirect to="/"/>}
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)