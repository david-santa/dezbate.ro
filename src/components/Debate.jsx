import {connect} from "react-redux";
import {createMuiTheme, MuiThemeProvider, withStyles} from "@material-ui/core";
import React from "react";

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
    arguments;

    constructor(props) {
        super(props);
    }

    state = {}

    componentDidMount() {
        fetch("http://davidsanta.ro:3001/topics" + "/" + this.debateId).then(res => res.json()).then(debate => {
            this.debate = debate;
            this.arguments = this.debate.message.children;
            for (let i = 0; i < this.arguments.length; i++) {
                console.log(this.arguments[i])
                fetch("http://davidsanta.ro:3001/arguments/" + this.arguments[i]).then(res=> res.json()).then(
                    argument => console.log(argument)
                )
            }
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <MuiThemeProvider theme={customTheme}>
                <div>
                    Hello
                </div>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps)(withStyles(styles)(Debate))