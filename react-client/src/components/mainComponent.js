import React, {Component} from 'react';
import Home from './homeComponent';
import {connect} from 'react-redux';


const mapStateToProps = state =>{
    return{
        trending: state.trending
    }
}


class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            apiresp: "api resp is here"
        }
    }


    componentWillMount(){
        console.log("component will mount");
     fetch('http://localhost:3001/users')
        .then(resp => resp.text())
        .then(resp => this.setState({apiresp: resp}))
        .catch(err => console.log("error is ",err));
        console.log("component mounted");
    }
    

    render(){
        return(
            <>
            <h1>{this.state.apiresp}</h1>
            <Home trending={this.props.trending}/>
            </>
        );
    }
}

export default connect(mapStateToProps)(Main);