import React, {Component} from 'react';
import Home from './homeComponent';
import AnimeDetail from './animeDetailComponent';
import {connect} from 'react-redux';
import {signUp, loginUser, logoutUser, fetchTrending, fetchAnime} from '../redux/actioncreators'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';


const mapStateToProps = state =>{
    return{
        trending: state.trending,
        auth: state.auth,
        anime: state.anime
    }
}

const mapDistpatchToProps = dispatch => ({
    signUp : (firstname, lastname, username, password)=> dispatch(signUp(firstname, lastname, username, password)),
    loginUser: (creds)=>dispatch(loginUser(creds)),
    logoutUser: ()=>dispatch(logoutUser()),
    fetchTrending: ()=>dispatch(fetchTrending()),
    fetchAnime: (anime)=>dispatch(fetchAnime(anime)) 

})



class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            apiresp: "api resp is here"
        }
    }

    componentWillMount(){
         this.props.fetchTrending();
    //    console.log(this.props.trending.trending);
    }
    


    render(){
        const Homepage= () => {
            return(
                <Home 
                    trending={this.props.trending} 
                    anime={this.props.anime}
                    signUp={this.props.signUp}
                    loginUser = {this.props.loginUser}
                    auth={this.props.auth}
                    logoutUser = {this.props.logoutUser}
                    fetchAnime = {this.props.fetchAnime}
                />
            );
        }

        const TrendingAnimeDetail = ({match}) =>{

            return(
                <AnimeDetail 
                    anime = {this.props.trending.trending.data.filter((anime)=> anime.id === match.params.animeId)[0]}
                />
            );
        }

        const AnimeIdDetail = ({match}) => {
            return(
                <AnimeDetail 
                    anime = {this.props.anime.anime.data.filter((anime) => anime.id === match.params.animeId)[0]}
                />
            );
        }
       
        return(
            <>
            <Switch>
                <Route exact path="/home" component={Homepage} />
                <Route exact path="/trending/:animeId" component={TrendingAnimeDetail} />
                <Route exact path="/anime/:animeId" component={AnimeIdDetail} />
                <Redirect to="/home" />
            </Switch>
            
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(Main));