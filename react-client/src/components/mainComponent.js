import React, {Component} from 'react';
import Home from './homeComponent';
import {connect} from 'react-redux';
import {signUp, loginUser} from '../redux/actioncreators'


const mapStateToProps = state =>{
    return{
        trending: state.trending,
        auth: state.auth
    }
}

const mapDistpatchToProps = dispatch => ({
    signUp : (firstname, lastname, username, password)=> dispatch(signUp(firstname, lastname, username, password)),
    loginUser: (creds)=>dispatch(loginUser(creds))

})

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            apiresp: "api resp is here"
        }
    }


    
    

    render(){
        return(
            <>
            {/* <h1>{this.state.apiresp}</h1> */}
            <Home 
                trending={this.props.trending} 
                signUp={this.props.signUp}
                loginUser = {this.props.loginUser}
                auth={this.props.auth}
            />
            </>
        );
    }
}

export default connect(mapStateToProps, mapDistpatchToProps)(Main);