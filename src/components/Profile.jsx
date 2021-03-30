import React from 'react';
import firebase, {firestore} from '../firebase/firebaseUtils';
import ProfileStatsCard from "./ProfileStatsCard";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.currentUser)
    }

    render() {
        return (
            <div id={"profile-container"} style={{display: 'flex', height: '80vh', width: '80vw', justifyContent:''}}>
                <div id={"user-details"} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#ececec',
                    height: '80vh',
                    width: '30vw'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '15%',
                        alignContent: 'start'
                    }}>
                        <img src={this.props.currentUser.photoURL} style={{'borderRadius': '50px'}}/>
                        <h3 style={{display: 'inline', marginLeft: '5%'}}>{this.props.currentUser.displayName}</h3>
                    </div>
                    <div>
                        <p>Joined at</p>
                        <h3>{new Date(this.props.currentUser.createdAt.seconds * 1000).toDateString()}</h3>
                    </div>
                </div>
                <div id={"user-statistics"} style={{display: 'flex', flexDirection: 'row', background: '#ececec', marginLeft:'50px', width:'50vw'}}>
                    <div>
                        <ProfileStatsCard title={"Argumente"} value={this.props.currentUser.arguments}/>
                    </div>
                </div>
            </div>
        )
    }
}