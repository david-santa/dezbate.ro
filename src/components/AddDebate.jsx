import {connect} from "react-redux";
import React from "react";
import Topbar from "./Topbar";
import '../App.css';
import {Input} from 'antd';
import {Button, createMuiTheme, MenuItem, MuiThemeProvider, TextField, withStyles} from "@material-ui/core";
import {Select} from "@material-ui/core";
import {Add} from "@material-ui/icons";

const styles = (theme) => ({
    fontClr: {
        color: '#000000',
        textShadow: '0px 0px #ffffff',
        fontSize: '0px'
    }
})

class AddDebate extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        titleInput: '',
        descriptionInput: '',
        imageURLInput: '',
        typeInput: 'Sport',
    }


    handleSubmit = () => {
        const data = {
            "title": this.state.titleInput,
            "description": this.state.descriptionInput,
            "imageURL": this.state.imageURLInput,
            "views": 0,
            "veracityVotes": [],
            "comments": [],
            "children:": [],
            "arguments": 0,
            "participants": 0,
            "author": this.props.currentUser.id
        }
        fetch("http://davidsanta.ro:3001/topics", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => console.log(data));
    }

    handleInput = (e) => {
        this.setState({[e.target.id]: e.target.value})
    }

    render() {
        const {classes} = this.props;
        const customTheme=createMuiTheme({
            palette:{
                type:'dark'
            }
        })
        return (
            <MuiThemeProvider theme={customTheme}>
                <div style={{color: 'white'}}>
                    <Topbar/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        Adauga o noua dezbatere
                    </div>
                    <form autoComplete={"on"}>
                        <div style={{display: "flex", flexDirection: 'column'}}>
                            <div id={"firstRow"}
                                 style={{paddingLeft: '20vw', paddingRight: '20vw', display: "flex", flexDirection: 'row'}}>
                                <TextField required id={"titleInput"} label={"Titlu"} onChange={this.handleInput}
                                           variant={'outlined'}
                                           style={{
                                               marginBottom: '1vh',
                                               marginRight: '3vw'
                                           }}/>
                                <TextField id={"imageURLInput"} variant={'outlined'} label={"URL Imagine"}
                                           onChange={this.handleInput}
                                           style={{marginBottom: '1vh', marginRight: '3vw'}}/>

                                <TextField id={"categoryInput"}  variant={'outlined'} label={"Categorie"}
                                           onChange={this.handleInput}
                                />
                            </div>

                            <div id={"secondRow"}
                                 style={{paddingLeft: '20vw', paddingRight: '20vw', display: "flex", flexDirection: 'row'}}>
                                <TextField multiline rows={8} id={"descriptionInput"} onChange={this.handleInput}
                                           variant={'outlined'}
                                           style={{marginBottom: '1vh', width: '100vw', color:'white'}} label={"Descriere"}/>
                            </div>


                            <Button style={{
                                background: 'lightGreen',
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                                    onClick={this.handleSubmit}> Trimite </Button>
                        </div>
                    </form>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps)(withStyles(styles)(AddDebate))