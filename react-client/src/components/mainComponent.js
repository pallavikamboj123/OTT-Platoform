import React, {Component} from 'react';
import Home from './homeComponent';
import MovieDetail from './movieDetailComponent';
import {connect} from 'react-redux';
import {signUp, loginUser, logoutUser} from '../redux/actioncreators'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import unirest from 'unirest';

const mapStateToProps = state =>{
    return{
        trending: state.trending,
        auth: state.auth
    }
}

const mapDistpatchToProps = dispatch => ({
    signUp : (firstname, lastname, username, password)=> dispatch(signUp(firstname, lastname, username, password)),
    loginUser: (creds)=>dispatch(loginUser(creds)),
    logoutUser: ()=>dispatch(logoutUser())

})



class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            apiresp: "api resp is here"
        }
    }

    componentWillMount(){
        const req = unirest("GET","https://movie-database-imdb-alternative.p.rapidapi.com/");
    req.query({
        "page": "1",
        "r":"json",
        "s":"titanic"
    });
    req.headers({
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
	"x-rapidapi-key": "a62d88a333msh19842c8d2797073p1513dejsn1f3e119aa17a"
    });

    req.end((res)=>{
        if(res.error){
           console.log(res.error);

        }
        console.log(res.body);
    });
    }
    
    

    render(){
        const Homepage= () => {
            return(
                <Home 
                    trending={this.props.trending} 
                    signUp={this.props.signUp}
                    loginUser = {this.props.loginUser}
                    auth={this.props.auth}
                    logoutUser = {this.props.logoutUser}
                />
            );
        }
        const MovieWithId = ({match}) => {
            // const movie = this.props.trending.filter((movie)=>{
            //     const check = toString(movie.id);
               
            //         console.log(typeof(check)," movie type ",typeof(match.params.movieId)," match");
               
            // });
            const check = parseInt(match.params.movieId);
            console.log("type is ",typeof(check));
            return (
                <MovieDetail movie={this.props.trending.filter((movie)=> movie.id === check)[0]}

                />
            );
        }
        return(
            <>
            <Switch>
                <Route exact path="/home" component={Homepage} />
                <Route exact path="/movies/:movieId" component={MovieWithId } />
                <Redirect to="/home"/>
            </Switch>
            
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(Main));