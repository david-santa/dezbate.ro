import React from "react";
import {AppBar, Menu, MenuItem, Toolbar} from "@material-ui/core";
import logoFaraText from "../res/logoFaraText.png";
import Button from "@material-ui/core/Button";
import {ExpandMore} from "@material-ui/icons";
import {Link, Redirect} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import {auth} from "../firebase/firebaseUtils";


const styles = (theme) => ({
    snapRight: {
        'margin-left': 'auto',
    }
})

class Topbar extends React.Component{
    constructor(props) {
        super(props);
    }

    handleExpandMenu = (e) => {
        this.setState({menuAnchor: e.currentTarget});
    }

    handleCloseMenu = () => {
        this.setState({menuAnchor: null})
    }

    handleLogout = () => {
        auth.signOut();
    }

    handleProfileClick = () =>{
        return <Redirect to={'/profile'}/>
    }

    state={
        menuAnchor: null
    }

    render() {
        const {classes} = this.props;
        return(
            <AppBar>
                <Toolbar>
                    <img src={logoFaraText} height={"50px"}/>
                    <Button size={"small"}
                            style={{
                                padding: '10px 10px 10px 20px',
                                'fontSize': 'min(2vw,16px)',

                                'color': '#ececec'
                            }}>Descopera</Button>
                    <Button size={"large"} style={{padding: '10px', 'fontSize': 'min(2vw,16px)', 'color': '#ececec'}}>Incepe
                        o dezbatere</Button>
                    <div style={{display: 'flex', flexDirection: "row", alignItems: 'center'}}
                         className={classes.snapRight}>
                        <p style={{'fontSize':'min(2vw,16px)'}} className={classes.snapRight}>{this.props.currentUser?this.props.currentUser.displayName===null?this.props.currentUser.email:this.props.currentUser.displayName:<></>}</p>
                        <img height={"35px"}
                             style={{"borderRadius": "50%", "marginLeft": "10px", position: "relative"}}
                             src={this.props.currentUser ? this.props.currentUser.photoURL : ""}/>
                        <Button
                            onClick={this.handleExpandMenu}> <ExpandMore/> </Button>
                        <Menu
                            id={'profileMenu'}
                            anchorEl={this.state.menuAnchor}
                            keepMounted
                            open={Boolean(this.state.menuAnchor)}
                            onClose={this.handleCloseMenu}
                        >
                            <MenuItem><Link to={'/profile'}>Profile</Link></MenuItem>
                            <MenuItem onClick={this.handleCloseMenu}>My account</MenuItem>
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                        </Menu>

                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Topbar)