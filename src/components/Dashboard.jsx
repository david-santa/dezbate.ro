import React from "react";
import {auth} from "../firebase/firebaseUtils";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import logoFaraText from '../res/logoFaraText.png'
import {withStyles} from '@material-ui/core/styles'
import {
    Accordion,
    AccordionSummary,
    AppBar,
    Card,
    CardContent,
    Menu, MenuItem,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ExpandMore} from "@material-ui/icons";

const styles = (theme) => ({
    snapRight: {
        'margin-left': 'auto',
    }
})

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        menuAnchor: null
    }

    handleExpandMenu = (e) => {
        this.setState({menuAnchor: e.currentTarget});
    }

    handleCloseMenu = () => {
        this.setState({menuAnchor: null})
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
                        <div style={{display: 'flex', flexDirection: "row", alignItems: 'center'}}
                             className={classes.snapRight}>
                            <p className={classes.snapRight}>{this.props.currentUser ? this.props.currentUser.displayName : <></>}</p>
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
                                <MenuItem onClick={this.handleCloseMenu}>Profile</MenuItem>
                                <MenuItem onClick={this.handleCloseMenu}>My account</MenuItem>
                                <MenuItem onClick={this.handleCloseMenu}>Logout</MenuItem>
                            </Menu>

                        </div>
                    </Toolbar>
                </AppBar>

                <div>
                    {console.log(this.currentUser)}
                    {this.props.currentUser ?
                        <div><h1>I am the Dashboard!</h1>
                        </div> : <Redirect to="/"/>}
                </div>

                <div>
                    <Paper>
                        <Grid container>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography>
                                            hau
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <Typography>
                                            hau2
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>


            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)