import React from 'react';

export default class Profile extends React.Component{
    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return(
            <>
                <h1>profile</h1>
            </>
        )
    }
}