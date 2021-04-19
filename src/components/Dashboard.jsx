import React from "react";
import {Redirect} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles'
import {Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DebateCard from "./DebateCard";
import Topbar from "./Topbar";

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        topicsArray: []
    }

    componentDidMount() {
        fetch("http://davidsanta.ro:3001/topics").then(res => res.json()).then(topics => this.setState({topicsArray: topics.message})).then(res => console.log(this.state.topicsArray));
        console.log("COMPONENT DID MOUNT")
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={"dashboard_container"}>
                <Topbar/>

                <br/>
                <br/>
                <br/>

                <div style={{}}>
                    <Paper style={{display: 'flex', alignContent: 'center', padding: '30px', background: "#1b1b2f"}}>
                        <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
                            {this.state.topicsArray.map(item => <Grid item key={item._id}>
                                <DebateCard titlu={item.title} imagine={item.imageURL}
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