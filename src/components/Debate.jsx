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

    debate = window.location.href.split("=")[1];

    constructor(props) {
        super(props);
    }

    state = {}

    componentDidMount() {
        fetch("http://davidsanta.ro:3001/topics" + "/" + this.debate).then(res => res.json()).then(debate => console.log(debate));
    }

    render() {
        console.log(this.debate);
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