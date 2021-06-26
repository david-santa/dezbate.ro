import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Menu,
    MenuItem,
    Typography, withStyles
} from "@material-ui/core";
import {Chat, GroupSharp, MoreVert, Visibility} from "@material-ui/icons";
import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class DebateCard extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    state = {
        anchorEl: null
    }

    handleOptions = (event) => {
        this.setState({anchorEl: event.currentTarget})
    }

    handleClose = () => {
        this.setState({anchorEl: null})
    }

    handleReport = () => {
        console.log("report")
    }

    handleDelete = () =>{
        console.log('deleted')
    }

    render() {
        return (
            <div>
                <Card variant={'outlined'}
                      style={{width: 'max(350px,35vh)', background: "#1f4068", color: '#ececec'}}>
                    <CardHeader
                        action={<IconButton onClick={this.handleOptions} aria-label='settings'>
                            <MoreVert/>
                        </IconButton>}
                        title={<Typography align={'center'} autoCapitalize={'true'}>

                            {this.props.titlu}
                        </Typography>}
                    />
                    <Menu
                        id={'optionsMenu'}
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleReport}> Raporteaza o problema </MenuItem>
                        {this.props.currentUser? (this.props.currentUser.displayName==='Şanta David'?<MenuItem onClick={this.handleDelete}>Delete Debate</MenuItem>:null) :  null}
                        {/*{this.props.currentUser.displayName==='Şanta David'?<MenuItem onClick={this.handleReport}> Raporteaza o problema </MenuItem>:<></>}*/}
                    </Menu>
                    <CardMedia>
                        <Link to={'/debate?uid=' + this.props.id} style={{textDecoration: 'none'}}>
                            <img
                                style={{
                                    'display': 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    width: '80%'
                                }}
                                src={this.props.imagine}
                                alt={"There should be an image here but it's currently unavailable"}
                            />
                        </Link>
                    </CardMedia>
                    <CardContent>
                    </CardContent>
                    <br/>
                    <CardActions>
                        <div style={{display: 'flex', alignContent: 'center', marginLeft: '15px'}}>
                            <Chat/> {this.props.argumente}
                        </div>
                        <div style={{display: 'flex', alignContent: 'center', marginLeft: '15px'}}>
                            <Visibility/> {this.props.vizualizari}
                        </div>
                        <div style={{display: 'flex', alignContent: 'center', marginLeft: '15px'}}>
                            <GroupSharp/> {this.props.participanti}
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps)(DebateCard);