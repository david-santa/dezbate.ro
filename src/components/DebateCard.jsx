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
                <Card style={{height: '325px', width: '345px', background: "#1f4068", color: '#ececec'}}>
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
                        {/*<Typography>*/}
                        {/*    {this.props.descriere}*/}
                        {/*</Typography>*/}
                        {/*<br/>*/}
                    </CardContent>
                    <br/>
                    <CardActions>
                        <div style={{display: 'flex', alignContent: 'center', marginLeft: '15px'}}><Chat/> 32
                        </div>
                        <div style={{display: 'flex', alignContent: 'center', marginLeft: '15px'}}><Visibility/> 44.6k
                        </div>
                        <div style={{display: 'flex', alignContent: 'center', marginLeft: '15px'}}><GroupSharp/> 18
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }

}