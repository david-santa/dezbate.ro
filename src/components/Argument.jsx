import {createMuiTheme, withStyles} from "@material-ui/core";
import {connect} from "react-redux";

const customTheme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})

class Argument extends React.Component{

    argumentId = window.location.href.split("=")[1];

    constructor(props) {
        super(props);
    }

    state={
        argument: "Loading"
    }

    componentDidMount() {
        let proargumentstemp = [];
        let conargumentstemp = [];
        fetch("http://davidsanta.ro:3001/arguments" + "/" + this.argumentId).then(res => res.json()).then(argument => {
            console.log(argument)
            this.setState({argument: argument.message})
        })
    }

    render() {
        return(
            <div>
                <h1>
                    {this.state.argument.content}
                </h1>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})
export default connect(mapStateToProps)(withStyles(styles)(Argument))