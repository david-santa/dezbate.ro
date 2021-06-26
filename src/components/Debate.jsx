import {connect} from "react-redux";
import {
    Card,
    CardContent,
    createMuiTheme, Dialog, DialogActions, DialogContent, DialogTitle,
    Divider,
    MuiThemeProvider,
    Paper, TextField,
    Typography,
    withStyles
} from "@material-ui/core";
import React from "react";
import Topbar from "./Topbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";

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
        argumentField: ''
    }

    componentDidMount() {
        this.fetchData();
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
                                                {value.content}
                                            </CardContent>
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
                                                {value.content}
                                            </CardContent>
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