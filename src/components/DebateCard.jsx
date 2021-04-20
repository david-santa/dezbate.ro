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
                <Card variant={'outlined'} style={{width: 'max(350px,35vh)', background: "#1f4068", color: '#ececec'}}>
                    <CardHeader
                        action={<IconButton aria-label='settings'>
                            <MoreVert/>
                        </IconButton>}
                        title={<Typography align={'center'} autoCapitalize={'true'} >
                            {this.props.titlu}
                        </Typography>}
                    />
                    <CardMedia>
                        <img
                            style={{
                                'display': 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '80%'}}
                            src={this.props.imagine}
                            alt={"There should be an image here but it's currently unavailable"}
                        />
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