import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import React from "react";

class Debate extends React.Component {
    constructor(props) {
        super(props);
    }
}

export default connect(mapStateToProps)(withStyles(styles)(Debate))