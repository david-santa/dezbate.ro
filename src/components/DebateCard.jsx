import {Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography} from "@material-ui/core";
import {Chat, GroupSharp, MoreVert, Visibility} from "@material-ui/icons";
import React from "react";

export default class DebateCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card style={{height: '325px', width: '350px', background: "#1f4068", color: '#ececec'}}>
                    <CardHeader
                        action={<IconButton aria-label='settings'>
                            <MoreVert/>
                        </IconButton>}
                        title={<Typography>
                            {this.props.titlu}
                        </Typography>}
                    />
                    <CardMedia>
                        <img
                            src={this.props.imagine}/>
                    </CardMedia>
                    <CardContent>
                    </CardContent>
                    <br/>
                    <CardActions>
                        <div style={{display: 'flex', alignContent: 'center', marginLeft: '15px'}}><Chat/> {this.props.argumente}
                        </div>
                        <div style={{display: 'flex', alignContent: 'center', marginLeft: '15px'}}><Visibility/> {this.props.vizualizari}
                        </div>
                        <div style={{display: 'flex', alignContent: 'center', marginLeft: '15px'}}><GroupSharp/> {this.props.participanti}
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }

}