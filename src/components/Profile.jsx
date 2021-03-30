import React from 'react';
import firebase, {firestore} from '../firebase/firebaseUtils';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.currentUser)
    }

    render() {
        return (
                <h1>profile</h1>
        )
    }
}