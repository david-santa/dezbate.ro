import {connect} from "react-redux";
import React from "react";
import Topbar from "./Topbar";
import {Button, TextField, withStyles} from "@material-ui/core";

class AddDebate extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        titleInput: '',
        descriptionInput: '',
        imageURLInput: ''
    }


    handleSubmit = () => {
            const data = {
                "title": this.state.titleInput,
                "description": this.state.descriptionInput,
                "imageURL": this.state.imageURLInput,
                "views":0,
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
        return (
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
                    <div style={{paddingLeft: '30vw', paddingRight: '30vw', display: "flex", flexDirection: 'column'}}>
                        <TextField required id={"titleInput"} label={"Titlu"} onChange={this.handleInput}
                                   style={{background: '#3f51b5', marginBottom: '1vh'}}/>
                        <TextField multiline rowsMax={6} id={"descriptionInput"} onChange={this.handleInput}
                                   style={{background: '#3f51b5', marginBottom: '1vh'}} label={"Descriere"}/>
                        <TextField id={"imageURLInput"} label={"URL Imagine"} onChange={this.handleInput}
                                   style={{background: '#3f51b5', marginBottom: '1vh'}}/>
                        <Button style={{
                            background: 'lightGreen',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                                onClick={this.handleSubmit}> Trimite </Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps)(AddDebate)