import React from "react";

export default class ProfileStatsCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column', 'alignContent': 'flex-start'}}>
                <p>{this.props.title}</p>
                <h3>{this.props.value}</h3>
            </div>
        )
    }
}