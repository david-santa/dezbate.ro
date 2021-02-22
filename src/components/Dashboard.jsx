import React from "react";
import {auth} from "../firebase/firebaseUtils";
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";

export default class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                {console.log(this.currentUser)}
                {this.props.currentUser?<div><h1>I am the Dashboard!</h1> <Button onClick ={()=> auth.signOut()}> Sign Out </Button></div>:<Redirect to = "/"/>}
            </div>
        )
    }
}