import React from "react";
import {auth} from "../firebase/firebaseUtils";
import {Redirect, Route} from "react-router-dom";
import Button from "@material-ui/core/Button";
import logoFaraText from '../res/logoFaraText.png'
import {withStyles} from '@material-ui/core/styles'
import {
    Accordion,
    AccordionSummary,
    AppBar,
    Card,
    CardContent, CardHeader, CardMedia, IconButton,
    Menu, MenuItem,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {ExpandMore, MoreVert} from "@material-ui/icons";
import DebateCard from "./DebateCard";

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
        menuAnchor: null,
        topicsArray: []
    }

    componentDidMount() {
        fetch("http://localhost:3001/topics").then(res => res.json()).then(topics => this.setState({topicsArray: topics.message})).then(res => console.log(this.state.topicsArray));
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

    render() {
        console.log(this.props.currentUser)
        const {classes} = this.props;
        return (
            <div className={"dashboard_container"}>
                <AppBar>
                    <Toolbar>
                        <img src={logoFaraText} height={"50px"}/>
                        <Button size={"large"}
                                style={{
                                    padding: '10px 10px 10px 20px',
                                    'fontSize': '18px',
                                    'color': '#ececec'
                                }}>Descopera</Button>
                        <Button size={"large"} style={{padding: '10px', 'fontSize': '18px', 'color': '#ececec'}}>Incepe
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
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>

                        </div>
                    </Toolbar>
                </AppBar>

                <br/>
                <br/>
                <br/>

                <div>
                    {this.props.currentUser ?
                        <></> : <Redirect to="/"/>}
                </div>

                <div style={{}}>
                    <Paper style={{display: 'flex', alignContent: 'center', padding: '30px', background: "#1b1b2f"}}>
                        <Grid container spacing={3}
                              style={{display: 'flex', alignContent: 'center', flexDirection: 'row'}}>
                            {this.state.topicsArray.map(item => <Grid item>
                                <DebateCard key={item._id} titlu={item.title} imagine={item.imageURL} vizualizari={item.views} participanti={item.participants} argumente={item.arguments}>

                                </DebateCard>
                            </Grid>)}
                        </Grid>
                    </Paper>
                </div>


            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)