import {
    Card,
    CardActions,
    CardContent,
    createMuiTheme, Divider, IconButton,
    MuiThemeProvider,
    Slider, Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";
import {connect} from "react-redux";
import React from 'react';
import Topbar from "./Topbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import axios from "axios";
import {Grade, Report, ThumbUp} from "@material-ui/icons";
import firebase from "firebase";

const db = firebase.firestore();

const styles = (theme) => ({
    fontClr: {
        color: '#000000',
        textShadow: '0px 0px #ffffff',
        fontSize: '0px'
    }
})

const customTheme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})

class Argument extends React.Component {

    argumentId = window.location.href.split("=")[1];
    argumentIds;

    constructor(props) {
        super(props);
    }

    state = {
        argument: "Loading",
        proArgumentsArray: [],
        conArgumentsArray: []
    }

    componentDidMount() {
        let proargumentstemp = [];
        let conargumentstemp = [];
        this.fetchData()
    }

    fetchData(){
        let proargumentstemp = [];
        let conargumentstemp = [];
        fetch("http://davidsanta.ro:3001/arguments" + "/" + this.argumentId).then(res => res.json()).then(argument => {
            console.log(argument.message)
            this.setState({argument: argument.message})
            this.argumentIds = argument.message.children;
            for (let i = 0; i < this.argumentIds.length; i++) {
                fetch("http://davidsanta.ro:3001/arguments/" + this.argumentIds[i]).then(res => res.json()).then(
                    argument => {
                        if (argument.message.type === 'pro') proargumentstemp.push(argument.message)
                        else conargumentstemp.push(argument.message)
                    }
                ).then(res => {
                    this.setState({proArgumentsArray: proargumentstemp})
                    this.setState({conArgumentsArray: conargumentstemp})
                })
            }
        })
    }

    calculateImpact = (arr) => {
        let sum = 0;
        for (const grade in arr) {
            sum += grade
        }
        return sum / arr.length
    }

    handleChangeArgument = (value) =>{
        window.location.href='/argument?uid='+value._id
    }

    render() {
        return (
            <MuiThemeProvider theme={customTheme}>
                <div>
                    <Topbar/>
                </div>
                <br/> <br/> <br/>
                <div style={{margin: '5vh 20vw 0vh 20vw', 'fontSize': 'min(2vw,16px)'}}>
                    <Grid container justify={"center"} direction={"column"} alignItems={"center"} spacing={1}
                          style={{background: '#3f51b5', 'fontSize': 'min(2vw,16px)', borderRadius: ' 8px'}}>
                        <Button>
                            Revino la dezbatere
                        </Button>
                        <Grid item style={{background: '#3f51b5'}}>
                            <Typography variant={"h4"} gutterBottom
                                        style={{textAlign: "center", color: "#fff", 'fontSize': 'min(2vw,64px)'}}>
                                {this.state.argument.content}
                            </Typography>
                        </Grid>
                        <Grid container direction={'row'} alignItems={'flex-start'} justify={"center"}>
                            <Grid container justify={"flex-start"} direction={"column"} alignItems={"stretch"}
                                  spacing={2}
                                  style={{
                                      maxWidth: '20vw',
                                      marginRight: '1vw',
                                      marginBottom: '1vh',
                                      paddingTop: '1vh'
                                  }}>
                                <Button onClick={this.handleAddProArgument} variant='outlined'
                                        style={{background: '#41cc90', width: '100%', 'fontSize': 'min(2vw,12px)'}}>
                                    Adauga argument pro
                                </Button>
                                {this.state.proArgumentsArray.map((value, index) => (
                                    <Grid key={index} direction={"column"} item>
                                        <Card style={{maxWidth: '100%', background: '#1f4068'}}>
                                            {/*<Link to={'/argument?uid=' + value._id}*/}
                                            {/*      onClick={this.handleChangeArgument}*/}
                                            {/*      style={{textDecoration: 'none'}}>*/}
                                                <CardContent>
                                                    <Slider
                                                        disabled={true}
                                                        value={this.calculateImpact(value.impactVotes)}
                                                        min={1.0}
                                                        max={5.0}
                                                        step={1}
                                                        marks={this.sliderMarks}
                                                        style={{width: '7.5vw'}}
                                                    />
                                                    <br/>
                                                    <Typography color={'textPrimary'}>
                                                        {value.content}
                                                    </Typography>

                                                </CardContent>
                                            {/*</Link>*/}
                                            <CardActions>
                                                <Tooltip title={'Apreciaza'}>
                                                    <IconButton onClick={() => {
                                                        console.log(this.state.likedArguments)
                                                        console.log(this.state.likedArguments.indexOf(value._id))
                                                        if (this.state.likedArguments.indexOf(value._id) > -1) {
                                                            alert("Deja ai apreciat acest argument")
                                                        } else {
                                                            axios.put("http://davidsanta.ro:3001/arguments/" + value._id, {likes: value.likes + 1})
                                                            let temp = this.state.likedArguments;
                                                            temp.push(value._id);
                                                            this.setState({likedArguments: temp})
                                                            db.collection("users").doc(this.props.currentUser.id).update({
                                                                likedArguments: this.state.likedArguments
                                                            })
                                                        }
                                                    }} size={"small"}>
                                                        <ThumbUp/> {value.likes}
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Raporteaza o problema'}>
                                                    <IconButton size={"small"}>
                                                        <Report/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Noteaza impact'}>
                                                    <IconButton size={"small"}>
                                                        <Grade/>
                                                    </IconButton>
                                                </Tooltip>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                            <Divider orientation={'vertical'} flexItem/>
                            <Grid container justify={"flex-start"} direction={"column"} alignItems={""}
                                  spacing={2}
                                  style={{maxWidth: '20vw', marginLeft: '1vw', marginBottom: '1vh', paddingTop: '1vh'}}>
                                <Button variant='outlined' onClick={this.handleAddConArgument}
                                        style={{background: '#ff725c', width: '100%', 'fontSize': 'min(2vw,12px)'}}>
                                    Adauga argument contra
                                </Button>
                                {this.state.conArgumentsArray.map((value, index) => (
                                    <Grid key={index} item>
                                        <Card style={{width: '100%', background: '#1f4068'}}>
                                            {/*<Link to={'/argument?uid=' + value._id} style={{textDecoration: 'none'}}>*/}
                                                <CardContent>
                                                    <Slider
                                                        disabled={true}
                                                        value={this.calculateImpact(value.impactVotes)}
                                                        min={1.0}
                                                        max={5.0}
                                                        step={1}
                                                        marks={this.sliderMarks}
                                                        style={{width: '7.5vw'}}
                                                    />
                                                    <br/>
                                                    <Typography onClick={() => this.handleChangeArgument(value)} color={'textPrimary'}>
                                                        {value.content}
                                                    </Typography>
                                                </CardContent>
                                            {/*</Link>*/}
                                            <CardActions>
                                                <Tooltip title={'Apreciaza'}>
                                                    <IconButton size={"small"}>
                                                        <ThumbUp/> {value.likes}
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Raporteaza o problema'}>
                                                    <IconButton size={"small"}>
                                                        <Report/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title={'Noteaza impact'}>
                                                    <IconButton size={"small"}>
                                                        <Grade/>
                                                    </IconButton>
                                                </Tooltip>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (
    {
        user
    }
) => (
    {
        currentUser: user.currentUser
    }
)
export default connect(mapStateToProps)(withStyles(styles)(Argument))