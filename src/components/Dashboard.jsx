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
                                style={{padding: '10px 10px 10px 20px', 'fontSize': '18px'}}>Descopera</Button>
                        <Button size={"large"} color={"secondary"} style={{padding: '10px', 'fontSize': '18px'}}>Incepe
                            o dezbatere</Button>
                        <div style={{display:'flex', flexDirection:"row", alignItems:'center'}} className={classes.snapRight}>
                            <p className={classes.snapRight}>{this.props.currentUser ? this.props.currentUser.displayName : <></>}</p>
                            <img height={"35px"} style={{"borderRadius": "50%", "marginLeft": "10px", position:"relative"}}
                                 src={this.props.currentUser ? this.props.currentUser.photoURL : ""}/>
                        </div>
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