import React from "react";
import {auth} from "../firebase/firebaseUtils";
import {Link, Redirect, Route} from "react-router-dom";
import Button from "@material-ui/core/Button";
import logoFaraText from '../res/logoFaraText.png'
import {withStyles} from '@material-ui/core/styles'
import {Router} from 'react-router-dom';
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
import Topbar from "./Topbar";

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
        topicsArray: []
    }

    componentDidMount() {
        fetch("http://davidsanta.ro:3001/topics").then(res => res.json()).then(topics => this.setState({topicsArray: topics.message})).then(res => console.log(this.state.topicsArray));
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={"dashboard_container"}>
                <Topbar/>

                <br/>
                <br/>
                <br/>

                <div>
                    {this.props.currentUser ?
                        <></> : <Redirect to="/"/>}
                </div>

                <div style={{}}>
                    <Paper style={{display: 'flex', alignContent: 'center', padding: '30px', background: "#1b1b2f"}}>
                        <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
                            {this.state.topicsArray.map(item => <Grid item>
                                <DebateCard key={item._id} titlu={item.title} imagine={item.imageURL}
                                            vizualizari={item.views} participanti={item.participants}
                                            argumente={item.arguments}>

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