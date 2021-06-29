import {connect} from "react-redux";
import {
    Card, CardActions,
    CardContent,
    createMuiTheme, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider, IconButton,
    MuiThemeProvider,
    Paper, Slider, TextField, Tooltip,
    Typography,
    withStyles
} from "@material-ui/core";
import React from "react";
import Topbar from "./Topbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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

class Debate extends React.Component {

    debateId = window.location.href.split("=")[1];
    debate;
    argumentIds;

    constructor(props) {
        super(props);
    }

    state = {
        debate: "Loading",
        proArgumentsArray: [],
        conArgumentsArray: [],
        openDialogPro: false,
        openDialogCon: false,
        argumentField: '',
        likedArguments: []
    }

    componentDidMount() {
        this.fetchData();
        this.setState({likedArguments: this.props.currentUser.likedArguments})
    }

    fetchData() {
        let proargumentstemp = [];
        let conargumentstemp = [];
        fetch("http://davidsanta.ro:3001/topics" + "/" + this.debateId).then(res => res.json()).then(debate => {
            this.setState({debate: debate.message});
            let newViews = debate.message.views + 1;
            axios.put("http://davidsanta.ro:3001/topics/" + this.debateId, {views: newViews});
            this.argumentIds = debate.message.children;
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
        }).catch(err => console.log(err));
    }

    handleAddProArgument = () => {
        this.setState({openDialogPro: true});
    }

    handleAddConArgument = () => {
        this.setState({openDialogCon: true});
    }

    handleCloseDialog = () => {
        this.setState({openDialogPro: false})
        this.setState({openDialogCon: false})
    }

    handleInputChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handlePostProArgument = () => {
        const argument = {
            content: this.state.argumentField,
            topic: this.debateId,
            type: 'pro',
            parent: this.debateId,
            impactVotes: [],
            comments: [],
            user: this.props.currentUser.id,
            likes: 0,
            views: 0
        }
        axios.post("http://davidsanta.ro:3001/arguments", argument).then(res => {
            this.fetchData()
            this.handleCloseDialog()
        })
        this.setState({argumentField: ''})
    }

    handlePostConArgument = () => {
        const argument = {
            content: this.state.argumentField,
            topic: this.debateId,
            type: 'con',
            parent: this.debateId,
            impactVotes: [],
            comments: [],
            user: this.props.currentUser.id,
            likes: 0,
            views: 0
        }
        axios.post("http://davidsanta.ro:3001/arguments", argument).then(res => {
            this.fetchData();
            this.handleCloseDialog()
        })
        this.setState({argumentField: ''})
    }

    sliderMarks = [
        {
            value: 0,
            label: '0'
        },
        {
            value: 2
        },
        {
            value: 1,
            label: '1'
        },
        {
            value: 3,
            label: '3'
        },
        {
            value: 4
        },
        {
            value: 5,
            label: '5'
        }
    ]

    calculateImpact = (arr) => {
        let sum = 0;
        for (const grade in arr) {
            sum += grade
        }
        return sum / arr.length
    }

    handleLike = () => {

    }

    render() {
        return (
            <MuiThemeProvider theme={customTheme}>
                <div>
                    <Topbar/>
                </div>
                <br/> <br/> <br/>
                {
                    /**
                     * DIALOG PRO
                     */
                }
                <Dialog open={this.state.openDialogPro} onClose={this.handleCloseDialog}>
                    <DialogTitle>
                        Adauga argument pro
                    </DialogTitle>
                    <DialogContent>
                        <TextField autofocus name={'argumentField'} value={this.state.argumentField}
                                   onChange={this.handleInputChange} margin="dense" id={'argument'} label={'Argument'}
                                   fillWidth multiline={3}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog}>
                            Anuleaza
                        </Button>
                        <Button onClick={this.handlePostProArgument}>
                            Posteaza
                        </Button>
                    </DialogActions>
                </Dialog>
                {
                    /**
                     *   DIALOG CONTRA
                     */
                }
                <Dialog open={this.state.openDialogCon} onClose={this.handleCloseDialog}>
                    <DialogTitle>
                        Adauga argument contra
                    </DialogTitle>
                    <DialogContent>
                        <TextField autofocus name={'argumentField'} value={this.state.argumentField}
                                   onChange={this.handleInputChange} margin="dense" id={'argument'} label={'Argument'}
                                   fillWidth multiline={3}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog}>
                            Anuleaza
                        </Button>
                        <Button onClick={this.handlePostConArgument}>
                            Posteaza
                        </Button>
                    </DialogActions>
                </Dialog>
                <div style={{margin: '5vh 20vw 0vh 20vw', 'fontSize': 'min(2vw,16px)'}}>
                    <Grid container justify={"center"} direction={"column"} alignItems={"center"} spacing={1}
                          style={{background: '#3f51b5', 'fontSize': 'min(2vw,16px)', borderRadius: ' 8px'}}>
                        <Grid item style={{background: '#3f51b5'}}>
                            <Typography variant={"h4"} gutterBottom
                                        style={{textAlign: "center", color: "#fff", 'fontSize': 'min(2vw,64px)'}}>
                                {this.state.debate.title}
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
                                                {value.content}
                                            </CardContent>
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
                                                            this.setState({likedArguments:temp})
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
                                                {value.content}
                                            </CardContent>
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

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})
export default connect(mapStateToProps)(withStyles(styles)(Debate))