import React from 'react';
import firebase, {firestore} from '../firebase/firebaseUtils';
import ProfileStatsCard from "./ProfileStatsCard";
import Topbar from "./Topbar";
import {connect} from "react-redux";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        console.log(window.location.href.split("="))
    }

    user = window.location.href.split("=")[1];

    state = {
        photoURL: null,
        displayName: null,
        createdAt: null,
        argumente: null,
        dezbateri: null,
        comentarii: null,
        aprecieri: null
    }

    componentDidMount() {
        // const { match: { params } } = this.props;
        this.user = this.getUserData(this.user).then(r => {
            let createdAtDate = new Date(r.createdAt.seconds * 1000);
            this.setState({photoURL: r.photoURL,
                displayName:r.displayName,
            createdAt: createdAtDate.toDateString(),
            argumente: r.arguments,
            dezbateri: r.debatesStarted,
            comentarii: r.comments,
            aprecieri: r.totalLikes})
        });
    }

    async getUserData(uid) {
        const userRef = firestore.doc(`users/${this.user}`);
        const snapShot = await userRef.get();
        return snapShot.data();
    }


    render() {
        return (
            <>
                <Topbar/>
                <br/>
                <br/>
                <br/>
                <br/>
                {console.log(this.user)}
                <div id={"profile-container"}
                     style={{display: 'flex', height: '80vh', width: '80vw', justifyContent: ''}}>
                    <div id={"user-details"} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        background: '#1b1b2f',
                        color: '#ececec',
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
                            <img src={this.state.photoURL} style={{'borderRadius': '50px'}}/>
                            <h3 style={{display: 'inline', marginLeft: '5%'}}>{this.state.displayName}</h3>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '15%',
                            alignContent: 'start'
                        }}>
                            <p>Joined at</p>
                            <h3>{this.state.createdAt}</h3>
                        </div>
                    </div>
                    <div id={"user-statistics"} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        color: '#ececec',
                        background: '#1b1b2f',
                        marginLeft: '50px',
                        width: '50vw'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            color: '#ececec',
                            background: '#1b1b2f',
                            width: '100%'
                        }}>
                            <ProfileStatsCard title={"Argumente"} value={this.state.argumente}/>
                            <ProfileStatsCard title={"Dezbateri"} value={this.state.dezbateri}/>
                            <ProfileStatsCard title={"Comentarii"} value={this.state.comentarii}/>
                            <ProfileStatsCard title={"Aprecieri"} value={this.state.aprecieri}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps)(Profile)