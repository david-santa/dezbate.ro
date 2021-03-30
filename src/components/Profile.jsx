import React from 'react';
import firebase from '../firebase/firebaseUtils';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    componentDidMount() {
        firebase.firestore().doc('/users').then(r=>console.log(r));
    }

    render() {
        return (
            <>
                <h1>profile</h1>
            </>
        )
    }
}