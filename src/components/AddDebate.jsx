import {connect} from "react-redux";
import React from "react";

class AddDebate extends React.Component{


    render() {
        return(
          <div>
              Adauga o noua dezbatere
          </div>
        );
    }
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})

export default connect(mapStateToProps)(AddDebate)